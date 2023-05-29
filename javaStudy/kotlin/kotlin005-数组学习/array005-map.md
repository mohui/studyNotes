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
- flatMap案例 [{child: []}]
```
    val list = mutableListOf<NameObj>()
    list.add(
        NameObj(
            code = "human",
            name = "张三",
            age = 12,
            child = listOf(34, 3402)
        )
    )
    list.add(
        NameObj(
            code = "human",
            name = "李四",
            age = 12,
            child = listOf(34, 340202)
        )
    )
    list.add(
        NameObj(
            code = "beast",
            name = "龙",
            age = 120,
            child = listOf(41, 4127)
        )
    )
    list.add(
        NameObj(
            code = "beast",
            name = "凤",
            age = 122,
            child = listOf(41, 412723)
        )
    )
    val idList = list.flatMap { it.child?: listOf() }
    println(idList)
```

- flatMap案例
```

    val list = mutableListOf<NameObj>()
    list.add(
        NameObj(
            code = "human",
            name = "张三",
            age = 12,
            child = listOf(34, 3402)
        )
    )
    list.add(
        NameObj(
            code = "human",
            name = "李四",
            age = 12,
            child = listOf(34, 340202)
        )
    )
    list.add(
        NameObj(
            code = "divine",
            name = "龙",
            age = 120,
            child = listOf(41, 4127)
        )
    )
    list.add(
        NameObj(
            code = "divine",
            name = "凤",
            age = 122,
            child = listOf(41, 412723)
        )
    )
    list.add(
        NameObj(
            code = "beast",
            name = "猪",
            age = 122
        )
    )
    val returnMap = mutableMapOf<String, List<Int>>()
    val map = list.groupBy { it.code }
    println(map)
    /*
    {
        human=[
            NameObj(code=human, name=张三, age=12, child=[34, 3402]), 
            NameObj(code=human, name=李四, age=12, child=[34, 340202])
        ], 
        divine=[
            NameObj(code=divine, name=龙, age=120, child=[41, 4127]), 
            NameObj(code=divine, name=凤, age=122, child=[41, 412723])
        ], 
        beast=[
            NameObj(code=beast, name=猪, age=122, child=null)
        ]
    }
    */
    for (it in map) {
        val listDouble: List<List<Int>?> = it.value.map { it.child }
        // 这个
        val ids = listDouble.flatMap { it?: listOf() }
        // 或者用这个
        val collect: MutableList<Int> = listDouble.stream().flatMap { u -> u?.stream() }.collect(Collectors.toList())
        returnMap[it.key] = ids
    }
    println(returnMap)
    // {human=[34, 3402, 34, 340202], divine=[41, 4127, 41, 412723], beast=[]}

```