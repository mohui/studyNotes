# 函数的应用
- 内联函数 inline
- 函数引用 ::
- apply
- 具名函数调用
- run 函数
- with 函数

## 函数总结
- info.apply
1. apply 函数返回类型, 永远都是 info 本身, 此条和 also 一模一样
2. apply 函数的 匿名函数里面持有的是 this == info 本身, 此条和 run 一模一样
- let
1. let函数返回类型, 是根据匿名函数最后一条的变化而变化, 此条和 run 一模一样
2. let函数的匿名函数里面持有的是 it == 集合本身, 此条和 also 一模一样
- str.run
1. run 函数返回类型, 是根据匿名函数最后一行的变化而变化 此条和 let 一模一样
2. run 函数的匿名函数里面持有的事 this == str 本身, 此条和 apply 一模一样
- with(str), with 和 run 基本上一致, 只不过就是使用时候不同
1. with 函数返回类型, 是根据匿名函数最后一条变化而变化的 此条和 let 一模一样
2. with 函数的 匿名函数里面持有的是 this == str 本身, 此条和 apply 一模一样
- str.also
1. also 函数返回类型, 永远都是 str 本身, 此条和 apply 一模一样
2. also 函数的 匿名函数里面持有的是 it == str, 此条和 let 一模一样

## 内联函数
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
- 相同点:
1. apply 与 also 返回类型是一样的, 他们永远都是返回 info 本身
2. 匿名函数,最后一行无法作为返回值,不影响函数 
- 不同点
1. 匿名函数里面, apply { 持有 this setFilexxx() }
2. also{ 持有 it it.setFilexxx() }
- 应用点
1. 链式调用
#### also内置函数
- 这两个函数用法相同,区别apply是this, also是it

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

## 具名函数调用 

#### let 函数
- 相同点:
1. run 与 let 返回类型是一样的, 都会根据匿名函数最后一行返回类型而决定
2. run 与 let 的返回类型 是根据匿名函数最后一行变化而变化
- 不同点
1. 匿名函数里面 run 持有 this, let 持有 it
- 应用点
1. 
#### run 函数
* 函数返回类型会根据匿名函数最后一行变化而变化
* 里面持有的是 this == str本身, 和apply一样
```
fun main() {
    val info = "How Are You";
    info.run(::isLong)
        .run(::showText)
        .run(::mapText)
        .run(::println)
}

fun isLong(str: String) = if (str.length > 5) true else false
fun showText(isLong: Boolean) = if (isLong) "字符串合格" else "字符串不合格";
fun mapText(showText: String) = "[$showText]";
```

#### with 函数
- 和run函数类似,只是用法为 with()

```
fun main() {
    val info = "How Are You";
    with(info, ::isLong); // true
}
fun isLong(str: String) = if (str.length > 5) true else false

```

## takeIf 和 takeUnless

- takeIf 和 takeUnless 功能是相反的
- name.takeIf{true / false}, true: 返回name本身, false 返回null
- name.takeUnless{true / false}, false: 返回name本身, true 返回null

#### takeIf 函数应用

#### takeUnless 函数应用

