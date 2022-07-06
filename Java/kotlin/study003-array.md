# 数组
> Kotlin语言中的各种数组类型,虽然是引用类型, 背后可以编译成Java基本数据类型
- IntArray
- Map
1. map 可变集合
2. map 可变集合的添加
3. map 可变集合的减少

- forEach 用法
- for 用法
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

## IntArray
```
val list: IntArray = intArrayOf(11, 12, 13, 14, 15, 16);
```

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

```

## filter
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

## forEach 用法
```
// 第一种
list1.forEach {
    println("key: ${it.key} value: ${it.value}")
}

// 第二种
list1.forEach { (k, v) ->
    println("key: $k value: $v")
}

// 第三种(不推荐)
list1.forEach { k, v ->
    println("key: $k value: $v")
}
```

## for 用法
```
for (it in list1) {
    println("key: ${it.key} value: ${it.value}")
}
```

## getOrPut 用法
```
// 如果不存在, 添加进去并获取
println(list.getOrPut("swk") {800})
// 如果存在, 直接获取, 默认值不起效果
println(list.getOrPut("wyb") {800})
```


