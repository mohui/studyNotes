# redis持久化机制
- RDB: redis DataBase
- AOF: append-only file
> redis是内存数据库, 如果不讲内存中的数据库状态保存到磁盘,
> 那么一旦服务器进程退出, 服务器中的数据库状态也会消失, 所以redis提供了持久化功能
## RDB(redis DataBase)
> 1. 在指定的时间间隔内，将内存中的数据集快照写入磁盘，它恢复时是将快照文件直接读到内存中
> 2. redis会单独创建一个子进程来进行持久化，会现将数据写入到一个临时文件中，待持久化过程结束后，再用这个临时文件替换上次持久化好的文件
> 3. 整个过程中，主进程不进行任何IO操作这就确保了极高的性能。
> 4. 如果需要进行大规模数据的恢复，切对数据恢复的完整性不是非常敏感，那rdb方式要比aof方式更加的高效
> 5. rdb的缺点是最后一次持久化后的数据可能丢失
> 6. 我们默认的就是rdb一般情况下不需要修改这个配置
### 优点
> 1. 只有一个文件`dump.rdb`
> 2. 容灾性好
> 3. 性能最大化
> 4. 效率更高
> 5. 适合大规模的数据恢复
> 6. 对数据的完整性要求不高
### 缺点
> 1. 数据安全性低
> 2. 需要一定的时间间隔进程操作,如果redis意外宕机,这个最后一次修改数据就没有了
> 3. fork进程的时候,会占用一定的内存空间

### 触发规则
> 1. save的规则满足的情况下, 会自动触发rdb规则
> 2. 执行`flushall`命令,也会触发我们的rdb规则-
> 3. 退出redis,也会产生rdb文件

#### 如何恢复rdb文件
> 1. 只需要将rdb文件放在我们redis启动目录就可以, redis启动的时候会自动检查`dump.rdb`恢复其中的数据
> 2. 查看需要存在的位置
```bash
config get dir
 "dir"
/usr/local/bin # 如果在这个目录下存在`dump.rdb`文件, 启动就会自动恢复其中的数据

```
#### 配置文件中
```bash
save 900 1 # 默认只要900秒内修改了1次,就会触发rdb操作
save 300 10 # 默认只要300秒内修改了10次,就会触发rdb操作
save 60 1000 # 默认只要60秒内修改了10000次,就会触发rdb操作
save 60 5 # 默认只要60秒内修改了5次,就会触发rdb操作
```



## AOF(append only file)
- `优点`
> 1. 数据安全
> 2. 解决数据一致性问题
> 3. rewrite模式
> 4. 每一次修改都同步，文件的完整性会更加好，默认每秒同步一次，从不同步效率是最高的
- `缺点`
> 1. 相对于数据文件来说，AOF比RDB文件大, 回复速度慢，修复的数据也比rdb慢
> 2. aof是读写操作，运行效率也要比rdb文件大
> 3. 数据集大的时候,比rdb启动效率低

### 配置文件
- 默认是不开启，需要手动在配置文件进行配置,只需要把`appendonly no`改为`appendonly yes`就开启了AOF
- 会把所有写的操作都写入到`appendonly.aof`

> 1. 修改完， 重启redis就可以生效了  
> 2. 如果这个`appendonly.aof`文件有错误，这时候redis是启动不起来的，我们需要修复这个aof文件
> 3. redis为我们提供了一个工具 `redis-check-aof --fix` 
> 4. 如果文件正常，重启就可以恢复了
```bash
# 默认是不开启的，需要手动开启， 只需要把`appendonly no`改为`appendonly yes`
appendonly no
# 开启把no改为yes
# appendonly yes

# appendfsync always # 总是修改
# 每一秒重写一次
appendfsync everysec
# appendfsync no # 不修改

# 重写 是否进行重写
no-appendfsync-on-rewrite no

# 默认就是文件的无限追加，文件会越来越大

auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
# 如果aof文件大于64mb，fork一个新的进程来讲我们的文件进行重写

```

### 修复命令
```bash
# 修复
redis-check-aof --fix appendonly.aof
```

redis内存数据集大小上升一定的时候, 就会施行数据淘汰策略
volatile-lru: 设置过期时间的数据, 挑选最近最少的数据淘汰
volatile-ttl: 设置过期时间的数据, 挑选将要过期的数据淘汰
volatile-random: 设置过期时间的数据集中任意选择数据淘汰
allkeys-lru: 从数据集中挑选最近最少使用的数据淘汰
allkeys-random: 从数据集中任意数据淘汰
no-enviction: 禁止驱逐数据


使用key指令可以扫出制定模式的key列表

