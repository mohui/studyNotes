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