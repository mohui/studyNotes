# 扩展函数
- 扩展函数学习
- 扩展函数学习2
- 泛型扩展函数

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
## 扩展函数学习2
```
package com.bjknrt.newbie.example.controller

data class ResponseResult1(val msg: String, val code: Int)
data class ResponseResult2(val msg: String, val code: Int)
data class ResponseResult3(val msg: String, val code: Int)
data class ResponseResult4(val msg: String, val code: Int)
fun Any.showPrintlnContent() = println("当前内容是: $this")
fun Any.showPrintlnContent2(): Any {
     println("当前内容是: $this")
     return this
}

fun main(){
     ResponseResult1("login success", 200).showPrintlnContent()
     "孙悟空".showPrintlnContent()
     "贝吉塔".showPrintlnContent()
     val number1 = 99999;
     number1.showPrintlnContent()
     val number2 = 99999.9;
     number2.showPrintlnContent()
     val number3 = 99999.9f;
     number3.showPrintlnContent()
     val sex = '男'
     sex.showPrintlnContent()
     println()
     "女".showPrintlnContent2().showPrintlnContent2().showPrintlnContent2()
    println()
}
```

## 泛型扩展函数
```
package com.bjknrt.newbie.example.controller
// string类型就输出长度
fun <T> T.showContentInfo() = println(if (this is String) "字符串长度$length, 时间: ${System.currentTimeMillis()}" else "不是字符串,是: $this")

fun main(){
     45.showContentInfo()
     "hello".showContentInfo()
     '男'.showContentInfo()
     null.showContentInfo()
     true.showContentInfo()
    println()
}
```