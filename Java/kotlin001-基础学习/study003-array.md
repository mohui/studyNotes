# 数组
> Kotlin语言中的各种数组类型,虽然是引用类型, 背后可以编译成Java基本数据类型
- IntArray
- filter 过滤
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

## IntArray
```
val list: IntArray = intArrayOf(11, 12, 13, 14, 15, 16);
```

## filter 过滤
```
package com.bjknrt.newbie.example.controller

fun main(){
     val list: List<Int> = listOf<Int>(2, 4, 6, 5)
     val list1 = list.filter {
          it % 2 == 0
     }
     println(list1)


     val strList = listOf<String>("周一", "周二", "下周一", "周三", "下周四")
     val strList1 = strList.filter {
          // it.startsWith("周")
          it.contains("一")
     }
     println(strList1)

}
```



## getOrPut 用法
```
// 如果不存在, 添加进去并获取
println(list.getOrPut("swk") {800})
// 如果存在, 直接获取, 默认值不起效果
println(list.getOrPut("wyb") {800})
```
