# 目录
- 解构声明
- operator 运算符重载


## 解构声明
- 注意事项: 不能从 component0 开始, 必须从 component1, component2 和成员一一对应, 顺序下来, 数字也不能跳
- 添加运算符重载关键字 operator

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

## operator 运算符重载
```
package com.bjknrt.newbie.example.controller

// 普通类
class Kt(number1:Int, number2: Int) {
}

// 数据类
data class Kt2(var number1:Int, var number2: Int) {
    operator fun plus(p1: Kt2): Int {
        return (number1 + number2) + (p1.number1 * p1.number2)
    }
}

fun main(){

    /**
     * C++ 语言: +, - 运算符重载就行了
     * KT 语言: plus 代表 + 运算符重载
     */
    println(Kt2(2, 2) + Kt2(9, 3))

    println()

}

```