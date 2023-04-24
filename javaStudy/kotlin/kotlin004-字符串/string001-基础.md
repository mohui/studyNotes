# 内置字符串学习
- plus 字符串拼接
- indexOf 查找索引
- split 字符串拆分

## plus 字符串拼接
```
val string1 = "how".plus(" ").plus("are"). plus(" ").plus("you")
println(string1) // how are you
```

## indexOf 查找索引
- 如果没有查找到 返回 -1
```
val str = "how are you";
val index1 = str.indexOf('c')
println(index1) // -1

val index2 = str.indexOf("re")
println(index2) // 5
```

## split 字符串拆分
```
val str = "how are you";
val strArr = str.split(' ')
println(strArr) // [how, are, you]
```