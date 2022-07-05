# 扩展函数
- 扩展函数学习

## 扩展函数学习
```
package com.bjknrt.newbie.example.controller

// 假设这个代码是开源的, 或者是很庞大的JDK源码, 或者是非常复杂的开源库
class Kt(val name: String, val age: Int, val sex: Char)

// 增加扩展函数 show
fun Kt.show() {
     println("这个是 show 函数, name: $name, age: $age, sex: $sex")
}
// 增加扩展函数 getInfo
fun Kt.getInfo() = "这个是 getInfo 函数, name: $name, age: $age, sex: $sex"
// 扩展String函数
fun String.addExtAction(number: Int) = this + "@".repeat(number)

fun String.showStr() = println(this)

fun main(){
     val p = Kt("悟空", 30, '男')
     p.show()
     println(p.getInfo())
     println("hello".addExtAction(8))
     println("word".addExtAction(3))
     "这是我们的日志信息".showStr()
     "hi".showStr()

     /**

     */
    println()
}
```