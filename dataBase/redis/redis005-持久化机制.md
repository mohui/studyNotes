# redis持久化机制
- RDB: redis DataBase
- AOP: append-only file
> redis是内存数据库, 如果不讲内存中的数据库状态保存到磁盘,
> 那么一旦服务器进程退出, 服务器中的数据库状态也会消失, 所以redis提供了持久化功能
## RDB(redis DataBase)
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



## AOP(append only file)
### 优点
> 1. 数据安全
> 2. 解决数据一致性问题
> 3. rewrite模式
### 缺点
>1. AOF比RDB文件大, 回复速度慢
>2. 数据集大的时候,比rdb启动效率低


redis内存数据集大小上升一定的时候, 就会施行数据淘汰策略
volatile-lru: 设置过期时间的数据, 挑选最近最少的数据淘汰
volatile-ttl: 设置过期时间的数据, 挑选将要过期的数据淘汰
volatile-random: 设置过期时间的数据集中任意选择数据淘汰
allkeys-lru: 从数据集中挑选最近最少使用的数据淘汰
allkeys-random: 从数据集中任意数据淘汰
no-enviction: 禁止驱逐数据


使用key指令可以扫出制定模式的key列表

