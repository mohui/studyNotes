## 解构声明

```
package com.bjknrt.newbie.example.controller

// 普通类
class Kt(var name: String, var age:Int, var sex: Char) {
    /**
     * 注意事项: 不能从 component0 开始, 必须从 component1, component2 和成员一一对应, 顺序下来, 数字也不能跳
     * 添加运算符重载关键字
     */
    operator fun component1() = name
    operator fun component2() = age
    operator fun component3() = sex
}

// 数据类
data class Kt2(var name: String, var age:Int, var sex: Char) {}

fun main(){

    val (name, age, sex) = Kt("孙悟空", 9, '男')

    println("普通类 结构后: name: $name, age: $age, sex: $sex")

    println("数据类 结构后: name: $name, age: $age, sex: $sex")

    println()

}

```