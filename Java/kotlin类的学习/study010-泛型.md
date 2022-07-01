# 泛型
- 定义泛型类

## 定义泛型类
```
package com.bjknrt.newbie.example.controller

/**
 * 1. 定义 对象输出器 println(obj)
 * 2. 定义 两个对象 三个属性
 * 3. 对象 String, Int, Double, Float, Char 等测试 对象输出器
 */
class Kt<T>(private val obj: T) {
    fun show() = println("万能输出器: $obj")
}

data class Student(val name: String, val age: Int, val sex: Char)
data class Teacher(val name: String, val age: Int, val sex: Char)

fun main(){
    val stu1 = Student("孙悟空", 9, '男')
    val stu2 = Student("克林", 8, '男')

    val tea1 = Teacher("龟仙人", 308, '男')
    val tea2 = Teacher("猫仙人", 1000, '男')

    Kt(stu1).show()
    Kt(stu2).show()
    Kt(tea1).show()
    Kt(tea2).show()

    Kt(String("脏三".toByteArray())).show()

    println()
}
```