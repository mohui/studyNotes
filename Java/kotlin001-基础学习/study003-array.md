# 数组
> Kotlin语言中的各种数组类型,虽然是引用类型, 背后可以编译成Java基本数据类型
- IntArray
- getOrPut 用法

| 类型           | 关键字            |
|--------------|----------------|
| IntArray     | intArrayOf     |
| DoubleArray  | doubleArrayOf  |
| LongArray    | longArrayOf    |
| ShortArray   | shortArrayOf   |
| ByteArray    | byteArrayOf    |
| FloatArray   | floatArrayOf   |
| BooleanArray | booleanArrayOf |
| Array<对象类型>  | arrayOf        |
| Map          | mapOf          |

## 内置函数
- shuffled 随机打乱

## map
1. map 可变集合
2. map 可变集合的添加
3. map 可变集合的减少
4. flatMap

## for
- forEach 用法
- for 用法

## 合并数组
1. zip 合并函数
2. fold 累加

## filter 过滤
1. filter 过滤

## IntArray
```
val list: IntArray = intArrayOf(11, 12, 13, 14, 15, 16);
```

## getOrPut 用法
```
// 如果不存在, 添加进去并获取
println(list.getOrPut("swk") {800})
// 如果存在, 直接获取, 默认值不起效果
println(list.getOrPut("wyb") {800})
```
