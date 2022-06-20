### 数组
```
val list: List<Int> = listOf(2, 4, 6, 7, 8); // [2, 4, 6, 7, 8]

```

#### first 获取第一个元素
```
val v1 = list.first();
```

#### let
* let函数返回类型, 根据匿名函数最后一行变化而变化
* 匿名函数最后一行作为返回值
```
val sumFirst = list.let{
    it.first() + it.first()
}
```