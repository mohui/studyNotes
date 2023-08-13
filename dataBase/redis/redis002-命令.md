# redis命令

#### 切换数据库: `select 1`
#### 查看所有的key: `keys *`
#### 存儲: `set name whh`
> 把 whh 存储到了 name 中
#### 获取 `get name`
#### 查看db大小 `DBSIZE`
#### 清除当前数据库 `flushdb`
#### 清除全部数据库 `FLUSHALL`
#### 判断key是否存在 `EXISTS key`
```
// 判断name是否存在, 如果存在,返回1, 不存在返回0
exists name
```
#### 移除key:`move key`
```
// 移除name
move name 1
```

#### 设置过期时间10s(单位秒): `EXPIRE name 10`
```
// 设置name10秒后过期
EXPIRE name 10
// 查看过期时间
ttl name
```
#### 查看当前key的剩余时间 `ttl keyName`
```
ttl name
```
#### 查看当前key的类型: `type keyName`
```
type name
```
#### 追加: `APPEND name "Word"`
> 如果追加的当前key不存在,, 就相当于 set key

#### 获取字符串长度 `STRLEN key1`

#### 自增1: `incr keyName`
#### 自减1: `decr keyName`
#### 加10 `INCRBY keyName 10`
#### 减10 `DECRBY keyName 10`
#### 截取 `GETRANGE keyName 开始位置,结束位置`
```
set key1 "hello"
GETRANGE key1 0 3 // 结果为 hell
```
#### 替换 `SETRANGE key1 1 xx`
```
set key1 "hello"
// 从下表1开始,把字符串替换为xx
GETRANGE key1 1 xx // 结果为 hxxlo
```

#### 设置`key3`的值为`hello`,30秒后过期: `setex key3 30 "hello"`
#### 如果key不存在, 创建key: `setnx keyName keyValue`
 ```
// 如果mykey不存在, 创建mykey
setnx mykey "redis"
// 如果mykey存在,创建失败
setex mykey "hello"
```

#### 批量设置 `mset key1 value1 key2 value2`
#### 批量获取 `mget key1 key2`

#### `msetnx key1 value1 key2 value2`
> 是原子性的操作, 要么全部成功,要么全部失败
#### 先get在set: `getset`