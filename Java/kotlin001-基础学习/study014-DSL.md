# DSL学习
- DSL

## DSL
- DSL: 所谓的DSL领域专用语言 (Domain Specified Language / DSL)
- applyFile 函数, 就是 DSL 编程范式, 定义输入输出等规则
- 定义整个 lambda 规则标准, 输入, 必须是Context 这个类, 才有资格调用 apply5, 匿名函数里持有 this 和 it
- 定义整个 lambda 规则标准, 输出, 我们会始终返回 Context 本身, 所以你可以链式调用
- 然后 main 函数 就可以根据 DSL 编程方式标准规则, 来写具体的实现, 这就是 DSL 编程范式
```
package com.bjknrt.newbie.example.controller

class Context {
     val info = "我就是魔辉"
     val name = "魔王"

     fun toast(str: String) {
          println("toast:: $str")
     }
}

inline fun Context.apply5(lambda: Context.(String) -> Unit): Context {
     lambda(info)
     return this
}
//- DSL: 所谓的DSL领域专用语言 (Domain Specified Language / DSL)
fun main(){

     val context = Context().apply5 {
          toast("success")
          toast(it)
          toast(name)
     }
     println("我始终返回context本身: $context")
     println()
}

```