# 数组
1. Map 学习
2. map 可变集合
3. map 可变集合的添加
4. map 可变集合的减少
5. flatMap

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

##  Map
```
val list1: Map<String, Int> = mapOf<String, Int>("whh" to 28, "whb" to 29)
// 等效于
val list2: Map<String, Int> = mapOf<String, Int>(Pair("whh", 28), Pair("whb", 29))

// 如果通过 key 找不到, 返回null
println(list1["whq"]) // null

val list3 = listOf<String>("孙悟空", "猪八戒", "贝吉塔")
 val list4 = list.map{
      "姓名是: $it"
 }
 println(list2);
```

### map 可变集合
```
val list = mutableMapOf(Pair("wyb", 32), Pair("whb", 29), Pair("whh", 28), Pair("whq", 25))
```

#### map 可变集合的添加
```
// 添加一条
list += "mrp" to 21
// 添加一条
list["mzh"] = 9

// 添加一条 
list.put("lsj", 26)
等效于
list["lsj"] = 26
```

#### map 可变集合的减少
```
// 减去一条
list -= "whq"
```

### flatMap
- flatMap 相当于 List<List<String>> 集合的集合, 有嵌套关系
```
package com.bjknrt.newbie.example.controller

fun main() {
     val list = listOf(
          listOf(1, 2, 3),
          listOf(4, 5, 6),
          listOf(7, 2, 1)
     )
     
     println(list) // [[1, 2, 3], [4, 5, 6], [7, 2, 1]]
     println(list.flatMap { it }) //[1, 2, 3, 4, 5, 6, 7, 2, 1]
}
```