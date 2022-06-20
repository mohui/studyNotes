# 函数的应用
- apply
-

#### apply内置函数
* 例如字符串 info: String = "How Are You";
* 特点: apply 始终返回info字符串本身string类型
* 一般函数都会持有一个it, apply函数不会,但是会持有当前this == info字符串本身
```
val info = "How Are You";

// 原写法
println("info的长度${info.length}")
println("info的最后一个字母${info[info.length - 1]}")
println("info的全部小写${info.toLowerCase()}")

// apply写法
info.apply {
    // this省略不写
    println("info的长度${length}")
}.apply {
    println("info的最后一个字母${this[length - 1]}")
}.apply {
    // this省略不写
    println("info的全部小写${toLowerCase()}")
}
```