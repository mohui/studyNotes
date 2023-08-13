# redis 数据类型
#### 五大基本数据类型
- string
- list
- set
- hash
- Zset

#### 三种特殊数据类型
- geo
- hyperloglog
- bitmap

## string
```
// 把hello放到 key1中
set key1 hello
// 追加
APPEND key1 "Word"
// 打印打印出`helloWord` 
get key1

// 获取字符串长度 
STRLEN key1
```
### 类似于i++
```
// 设置一个基础值 views是key
set views 0
// 加1
incr views
// 减1
decr views
// 加10
INCRBY views 10
// 减10
DECRBY views 10
```
### 截取, 替换
- GETRANGE
- SETRANGE
```
set key1 "hello,word"
// 获取: hello,word
get key1
// 获取从0开始,到第三个 hell
GETRANGE key1 0 3
// 获取所有的 hello,word, 和get key1是一样的效果
GETRANGE key1 0 -1

// 把`hell,oword`从下表1开始替换为xx
SETRANGE key1 1 xx
get key1 // hxxlo,word
```
### 设置过期时间,不存在的设置
- setex: 设置过期时间
- setnx: 不存在设置(在分布式锁中会常常使用)
```
// 设置`key3`的值为`hello`,30秒后过期
setex key3 30 "hello"
// 如果mykey不存在, 创建mykey
setnx mykey "redis"
// 如果mykey存在,创建失败
setnx mykey "mysql"
```
### 批量设置: `mset`
```
mset k1 v1 k2 v2 k3 v3
keys * //会有三个key k1 k2 k3
```
### 对象
> set user1: 1 {name:zhangsan,age:3} 设置一个user:1的对象,值为json字符串来保存一个对象
```
mset user:1:name zhangsan user:1:age 2
mget user:1:name user:1:age
```

### 先get在set: `getset`
> 会返回旧的值,在改为新的值
```
// 因为db没有设置过,会返回nil
getset db redis
// 获取db, 会返回`redis`
get db
// 再次设置db,会返回 redis
getset db mongodb
```
## list

## set
## hash
## Zset