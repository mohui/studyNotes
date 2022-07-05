## infix 中缀表达式
```
package com.bjknrt.newbie.example.controller

/**
 * infix关键字
 *
 * 自定义的中缀表达式 + 扩展函数 一起使用, 使用者: "一".gogogo 1
 * 1. 条件一: 对第一个参数 C1.gogogo 函数扩展
 * 2. 条件二: 需要在括号 (c2: C2) 参数里面, 传递一个参数
 */
private infix fun<C1, C2> C1.gogogo(c2: C2) {
     // 经过一系列操作下,打印
     println("中缀表达式, 第一个参数是: $this")
     println("中缀表达式, 第二个参数是: $c2")
}

fun main(){
     // map自带的中缀表达式
     mapOf("零" to 0);

     // 自己写的中缀表达式
     123 gogogo '男'

     "孙悟空".gogogo('男')
}
```