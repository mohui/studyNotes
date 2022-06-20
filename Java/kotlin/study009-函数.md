# 函数的应用
- 内联函数 inline
- 函数引用 ::
- apply

#### 内联函数 inline
- 函数使用lambda作为参数, 就需要声明成内联
- 如果函数参数有 lambda, 尽量使用 inline 关键字声明成内联
- 内部会做优化,减少函数开辟,对象开辟的损耗
```
public inline fun loginApi(
  username: String,
  pwd: String,
  responseResult:(String, Int) -> Unit) {
    return "登录成功"
}
```

#### 函数引用
- 关键字是 ::
```
fun main() {
    /**
     * lambda属于函数类型的对象
     * 需要把 methodResponseResult 普通函数变成 函数类型的对象 (函数引用 ::)
     */
    login("whh", "123123", ::methodResponseResult)
}

fun methodResponseResult(msg: String, code: Int) {
    printLn("最终结果");
}

inline fun login(
  name: String,
  pwd: String,
  responseResult: (String, Int) -> Unit) {
    responseResult("登录成功", 200)
}
```

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