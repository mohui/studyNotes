# 协变
- out 协变学习
- in 逆变学习
- out和in的运用

> 协变: out 父类 = 子类
> 逆变 in 子类 = 父类

## out 协变学习
- 协变: 父类 泛型声明处 可以接收 子类 泛型具体处
- 泛型默认情况下, 泛型的子类对象 不可以赋值给 泛型的父类对象
- 泛型默认情况下, 泛型具体处的子类对象 不可以赋值给 泛型声明处的父类对象
- out: 泛型的子类对象 可以赋值给 泛型的父类对象
- out: 泛型具体出的子类对象 可以赋值给 泛型声明处的父类对象
```
package com.bjknrt.newbie.example.controller

/**
 * 协变学习
 */
// 生产者 out T 协变 [out T 此泛型能够被获取, 读取, 所以是 out]
interface Producer<out T> {

}

// 消费者 in T 逆变 [in T 此泛型只能被修改, 更新 所以是 in]
interface Consumer<in T> {

}

// 生产者 和 消费者 T 默认情况下, 是不变
interface ProducerAndConsumer {

}

open class Animal // 动物
open class Humanity:  Animal()// 人类
open class Man: Humanity() // 男人
open class WoMan: Humanity() // 女人

/**
 * 1. 泛型默认情况下, 泛型的子类对象 不可以赋值给 泛型的父类对象
 * 2. 泛型默认情况下, 泛型具体处的子类对象 不可以赋值给 泛型声明处的父类对象
 * 3. out: 泛型的子类对象 可以赋值给 泛型的父类对象
 * 4. out: 泛型具体出的子类对象 可以赋值给 泛型声明处的父类对象
 * 5. 协变: 父类 泛型声明处 可以接收 子类 泛型具体处
 */
fun main(){

    println()
}


```

## in 逆变学习
- 逆变: 子类 泛型声明处 可以接收 父类 泛型具体处
- 默认情况下, 泛型具体处的父类 是不可以赋值给 泛型声明处的子类的
- in: 泛型具体出的父类 是可以赋值给 泛型声明处的子类


## out和in的运用
- 声明处泛型: in T, out T 声明处指定关系, 这个是 Java 没有的功能
```
package com.bjknrt.newbie.example.controller

// 声明处泛型: in T, out T 声明处指定关系, 这个是 Java 没有的功能

/**
 * 整个 SetClass 里面的所有成员, 泛型相关, 只能修改,更改. 不能获取 读取人家的
 *
 * 小结: 当我们 对这个整个类里面的泛型 只能修改, 不能让外界读取时, 可以声明 in T 逆变
 */
class SetClass<in T>() {
    // 对T 只能修改, 不能给外界
    fun set1(item : T) {
        println("set1 你要设置的item是: $item")
    }
    fun set2(item : T) {
        println("set2 你要设置的item是: $item")
    }
    fun set3(item : T) {
        println("set3 你要设置的item是: $item")
    }

    /**
     *  不能给外界读取 (增加 in 后, 不能给外界读取, 所以编译不通过)

    fun get1() : T? {
    return null;
    }
    fun get2() : T? {
    return null;
    }
    fun get3() : T? {
    return null;
    }
     */

}

/**
 * 整个 GetClass 里面的所有成员, 泛型相关, 不能修改,更改. 只能获取 读取人家的
 *
 * 小结: 当我们 对这个整个类里面的泛型 只能给读取, 不能修改,更改时, 可以声明 out T 协变
 */
class GetClass<out T>(_item: T) {
    // 对T 只能读取, 不能给外界修改,更改
    val item = _item;
    /**
     * 不能给外界修改, 更改 (增加 out 后, 不能给外界修改 更改, 所以编译不通过)
    fun set1(item : T) {
        println("set1 你要设置的item是: $item")
    }
    fun set2(item : T) {
        println("set2 你要设置的item是: $item")
    }
    fun set3(item : T) {
        println("set3 你要设置的item是: $item")
    }
     */

    fun get1() : T? {
        return item;
    }
    fun get2() : T? {
        return item;
    }
    fun get3() : T? {
        return item;
    }
}

fun main() {
    // 逆变: in T  SetClass 只能修改更改, 不能给外界读取
    val p1 = SetClass<String>();
    p1.set1("悟空")
    p1.set2("悟饭")

    println();

    // 协变 out T GetClass 只能读取, 不能修改,更改
    val p2 = GetClass("比克")
    println(p2.get1())
    val p3 = GetClass("天神")
    println(p3.get3())

}
```