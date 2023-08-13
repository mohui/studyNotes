# redis持久化机制
- RDB: redis DataBase
- AOP: append-only file
## RDB: redis DataBase
### 优点
> 1. 只有一个文件`dump.rdb`
> 2. 容灾性好
> 3. 性能最大化
> 4. 效率更高
### 缺点
> 1. 数据安全性低

## AOP: append-only file
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

