### 数组

| 关键字    | 用法           | 
|--------|--------------|
| Int    | 整数类型         |
| String | 字符串          |

#### 不可变集合
```
val list: List<String> = listOf<String>("how", "are", "you", "fine", "thinks")
// 可以简化为
val list = listOf("how", "are", "you", "fine", "thinks")
```
#### 可变集合 MutableList
```
val list: MutableList<String> = mutableListOf<String>("how", "are", "you", "fine", "thinks")
// 可以简化为
val list = mutableListOf("how", "are", "you", "fine", "thinks")
```

#### 不可变 转为 可变 toMutableList
```
val list = listOf("how", "are", "you", "fine", "thinks")
val list1: MutableList<String> = list.toMutableList();
```

#### 可变 转为 不可变 toList
```
val list = mutableListOf("how", "are", "you", "fine", "thinks")
val list1: List<String> = list.toList();
```

#### let
* let函数返回类型, 根据匿名函数最后一行变化而变化
* 匿名函数最后一行作为返回值
```
val numberList: List<Int> = listOf(2, 4, 6, 7, 8); // [2, 4, 6, 7, 8]

val sumFirst = numberList.let{
    it.first() + it.first()
}
```

#### first 获取第一个元素
```
val v1 = list.first();
```

#### getOrElse 和 getOrNull
- getOrElse : 需要默认值,如果越界,会打印默认值
- getOrNull : 不需要默认值,如果越界,会打印 null
```
println(list.getOrElse(5) {"越界"}); // 越界
println(list.getOrNull(5)); // null
```

#### 可变(MutableList)之 add 添加
```
list.add("you");
```
#### 可变(MutableList)之 remove 删除
```
list.remove("how");
```

#### 可变(MutableList)之 removeIf 带条件删除
```
// 删除所有
list.removeIf{ true }
// 删除所有带 "o"的
list.removeIf{ it.contains("o")} // [are, fine, thinks]
```

#### 可变(MutableList)之 +=, -=
```
// += 的用法
list += "张三" // ["how", "are", "you", "fine", "thinks", "张三"]
// -= 的用法
list -= "thinks" // ["how", "are", "you", "fine", "张三"]
```

#### for 循环用法
```
for (s in list) {
    println(s)
}
```

#### forEach 用法
```
list.forEach {
    println(it)
}
list.forEachIndexed{
    index, item ->
    println("小标$index, 元素$item")
}
```

#### forEachIndexed 用法
```
list.forEachIndexed{
    index, item ->
    println("下标$index, 元素$item")
}
```

#### _可以拒绝接收
```
val (_, v2, v3, v4, v5) = list;
```

#### set 的用法
- 自动去重
```
val list: Set<String> = setOf("how", "are", "you", "you", "fine", "thinks");
println(list) // [how, are, you, fine, thinks]
println(list.elementAt(4)) // thinks
println(list.elementAt(5)) // 报错
println(list.elementAtOrElse(5) { "越界" }) // 越界
println(list.elementAtOrNull(5)) // null
```

#### 可变 set用法
```
val list: MutableSet<String> = mutableSetOf("how", "are", "you", "fine", "thinks");
```

#### 去重
```
val list: MutableList<String> = mutableListOf<String>("how", "are", "you", "fine", "thinks", "how")
val list1 = list.toSet();
val list2 = list.toSet().toList();
val list3 = list.distinct();
val list4 = list.toMutableSet().toMutableList();
```
    
        

