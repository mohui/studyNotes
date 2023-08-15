# redis 数据类型
#### 五大基本数据类型
- string(字符串)
- list(链表)
- set(集合)
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
#### `incr`: 自增1, 类似于i++
#### `decr`: 自减1, 类似于i--
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

#### `setex`: 设置过期时间
#### `setnx`: 不存在设置, 重复设置会失败(在分布式锁中会常常使用)
```
// 设置`key3`的值为`hello`,30秒后过期
setex key3 30 "hello"
// 如果mykey不存在, 创建mykey
setnx mykey "redis"
// 如果mykey存在,创建失败
setnx mykey "mysql"
```
### `mset`: 批量设置
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

### `getset`: 先get在set, 会返回旧的值,在改为新的值
> 执行后会看到旧的值, 然后把旧的值改为新的值, 但是看不到, 需要再次get才能看到
```
// 因为db没有设置过,会返回nil
getset db redis
// 获取db, 会返回`redis`
get db
// 再次设置db,会返回 redis
getset db mongodb
```
## list
> 1. 在redis中, 我们可以把list完成`栈`,队列,阻塞队列
> 2. 所有的list命令,都是以`l`开头
> 3. 可以添加重复的值, 比如list里可以有`one,two,three,three`
- 小结
> 1. 它实际上是一个链表, before, after , left, right都可以插入值 
> 2. 如果key不存在,创建新的链表,存在: 新增内容
> 3. 如果移除了所有值, 空链表, 也代表不存在
> 4. 在两边插入或者改动值,效率最高 中间元素,相对来说效率会低一些
> 5. 可以玩消息排队, 消息队列(Lpush, Rpop), 栈(Lpush, Lpop)


#### `Lpush`: 将一个值或者多个值 `Lpush list one`
- 将一个值或者多个值,插入到列表头部(左侧)
#### `rpush`: 将一个值或者多个值 `rpush list two`
- 将一个值或者多个值,插入到列表尾部(右侧)
- 先进来的坐标数字会高,如下示例, 按照数组来说就是one的下标会是2
```
// 将一个值或者多个值,插入到列表头部(左侧)
LPUSH list one
LPUSH list two
LPUSH list three
```

#### LRANGE: 获取list中的值 `lRANGE list 0 -1`
- 也可以通过区间获取`lRANGE list 0 1`: 获取了前两个

#### `lpop`: 移除列表的第一个元素 `lpop list`
#### `rpop`: 移除列表的最后一个元素 `rpop list`
#### `lindex`: 通过下标获取去`list`中的某一个值.eg: `lindex list 1`
#### `Llen`: 返回列表的长度 `Llen list`
#### `Lrem`: 移除值 `Lrem key值 个数 要移除的值`
- 移除list集合中指定个数的value,精确匹配
> 比如我在list 存储了 `one,two,three,three`
```
// 移除掉一个one,此时结果为 [two,three,three]
Lrem list 1 one 
// 移除掉两个three,此时结果为 [two]
lrem list 2 three
```
#### `Ltrim`: 通过下标截取制定的长度 `Ltrim mylist 1 2`.
- 通过下标截取制定长度, 这个list已经该表了,截断了只剩下的元素
```
// 注意,这里是用rpush做的示例,所以第几个进来的它的下标就是几减去一,因为下标是0开始的
Rpush mylist hello 
Rpush mylist hello1 
Rpush mylist hello2
Rpush mylist hello3 
// 截取 结果为[hello1,hello2]
Ltrim mylist 1 2
```
#### rpoplpush: 移除列表的最后一个元素,将它移动到新的列表中 `rpoplpush mylist myotherlist`
- 把`mylist`的最后一个元素移动到`myotherlist`
#### `exists`: 判断这个列表是否存在 `exists list`
#### `lset`: 将列表中指定下表的值替换为另一个值, 更新操作 `lset list 0 item`
- 如果不存在列表,我们去更新会报错
```
// 判断这个列表是否存在
exists list 
// 把第一个元素更新为item, 如果不存在列表,我们去更新会报错
lset list 0 item
// 创建一个list,并在第一个元素放一个hello
lpush list hello
// 此时如果更新第二个元素,会报错,因为第二个元素不存在
lset list 1 item
```
#### `linsert`: 将某个具体的value插入到列表中某个元素的前面或者后面 
- `linsert 列表key after/vefire 制定的元素 要插入的元素`
```
// 比如有一个`mylist`的列表,里面有两个元素[hello, word], 现在在word后面插入一个whh
linsert mylist after word whh
// 现在在word前面插入一个whh
linsert mylist before word whh
```

## set
## hash
## Zset