# 类的关键字学习目录
- open 关键字
- is 检测类型
- as 类型转换
- as 智能转换


## open 关键字
- 移除final修饰
> kotlin语言的继承与重载的open关键字的学习
* 所有的 类 默认是final修饰的, 不能被 继承, 和Java相反
* 所有的 方法 默认是final修饰的, 不能被 重写, 和Java相反
```
package com.bjknrt.newbie.example.controller

// KT所有的类, 默认是final 修饰的, 不能被继承, 和Java相反
open class Kt(private val name: String) {
    private fun showName() = "父类的姓名: $name"

    // KT所有的函数, 默认是final 修饰的, 不能被重写, 和Java相反
    open fun myPrintln() = println(showName());
}

class Student(private val subName: String): Kt(subName) {
    private fun showName() = "子类的姓名: $subName"
    // 重写 myPrintln 方法
    override fun myPrintln() = println(showName());
}


fun main() {
    val kt: Kt = Student("小明");
    kt.myPrintln();
}
```

## is 检测类型
```
val str = "hello";
println(str is String); // true
```

## as 类型转换
- is + as 一般是配合使用

```
package com.bjknrt.newbie.example.controller

// KT所有的类, 默认是final 修饰的, 不能被继承, 和Java相反
open class Kt(private val name: String) {
    fun showName1() = "父类的姓名: $name"

    // KT所有的函数, 默认是final 修饰的, 不能被重写, 和Java相反
    open fun myPrintln() = println(showName1());
}

class Student(private val subName: String): Kt(subName) {
    fun showName2() = "子类的姓名: $subName"
    // 重写 myPrintln 方法
    override fun myPrintln() = println(showName2());
}


fun main() {
    val kt: Kt = Student("小明");
    kt.myPrintln();


    println(kt is Kt)
    println(kt is Student)
    if (kt is Student) (kt as Student).myPrintln()

    if (kt is Kt) println((kt as Kt).showName1())

    println();
}
```

## 智能转换
```
package com.bjknrt.newbie.example.controller

// KT所有的类, 默认是final 修饰的, 不能被继承, 和Java相反
open class Kt(private val name: String) {
    private fun showName1() = "父类的姓名: $name"

    // KT所有的函数, 默认是final 修饰的, 不能被重写, 和Java相反
    open fun myPrintln() = println(showName1());

    // 父类独有的函数
    fun methodPerson() = println("我是父类的方法")
}

class Student(private val subName: String): Kt(subName) {
    // 重写 myPrintln 方法
    override fun myPrintln() = println("子类的姓名: $subName");
    // 父类独有的函数
    fun methodStudent() = println("我是子类的方法")

}


fun main() {
    val kt: Kt = Student("小明");

    (kt as Student).methodStudent();
    kt.methodStudent();

    println();
}
```