# 扩展函数
- 扩展函数学习
- 扩展函数学习2
- 泛型扩展函数
- 扩展属性

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

## 标准和泛型 函数扩展
```
package com.bjknrt.newbie.example.controller

fun main(){
     val r = "hello".mLet {
          "ok"
     }
     2123.mLet {
          it
     }
     '男'.mLet {
          it
     }
    println()
     "hello".let { it }
}
/**
 * 1. private: 私有化
 * 2. inline: 我们的函数是告诫函数, 所以用到内联, 做lambda的优化, 性能提高
 * 3. fun<I, O>:  在函数中,申明两个泛型, 函数泛型, I输入Input, O 输出 Output
 * 4. I.mLet: 对 I 输入 Input 进行函数扩展, 扩展函数的名称是 mLet , 意味着 所有的类型, 万能类型, 都可以使用 xxx.mLet
 * 5. lambda: (I) -> 0 (I 输入) -> O 输出
 * 6. :O 会根据用户的返回类型 变化而变化
 * lambda(this): I 进行函数扩展, 在整个扩展函数里面 this == I 本身
 */

private inline fun<I, O> I.mLet(lambda: (I) -> O): O = lambda(this)
```

## 扩展属性
```
package com.bjknrt.newbie.example.controller

val myStr: String = "AA";

/**
 * 背后代码
public final class WhhKt {
     @NotNull
     private static final String myStr = "AA";

     @NotNull
     public static final String getMyStr() {
     return myStr;
     }
}
 */

val String.myInfo: String
     get() = "AA"

// 打印输出, 并且链式调用, (只有String有资格这样)
fun String.showPrintln(): String {
     println("打印输出 并且链式调用(只有string有资格这样), 内容$this")
     return this
}

val String.stringAllInfoValueVal
     get() = "当前${System.currentTimeMillis()}时间被调用, 值是: $this, 字符串长度是 $length"

fun main(){
     val str: String = "王网"
     println(str.myInfo)
     str.showPrintln().showPrintln()

     // 字符串属性函数调用
     "孙悟空".stringAllInfoValueVal
          .showPrintln().showPrintln().showPrintln()
}
```