# 循环的用法
- forEach 用法
- for 用法

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