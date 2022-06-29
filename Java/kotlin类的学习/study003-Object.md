# 类的关键字学习目录
- Any 超类学习
- Object
- 具名实现和匿名实现

## Any 超类学习
- Any 相当于 Java 的 Object
- 在kt中, 所有的类都隐式继承了 : Any();
- Any类在KT设计中, 只提供标准, 看不到实现,实现在各个平台设计好了


## Object 
- Object Kt 既是单例的实例, 也是类名, 只有一个创建,这就是典型的单例
```
Object kt {
}
```

### 具名实现和匿名实现
```
package com.bjknrt.newbie.example.controller

// KT接口
interface  RunnableKt {
    fun run()
}

open class Kt {
    open fun add(info: String) = println("Kt add: $info")
    open fun del(info: String) = println("Kt del: $info")
}

/**
 * 1. 匿名对象表达式方式
 * 2. 具名实现方式
 * 3. 对java 的接口, 用对象表达式方式
 * 3.1 java有两种方式, KT只有一种方式
 */
fun main() {
    // 匿名对象 表达式方式
    val p: Kt = object:Kt() {
        override fun add(info: String) {
            println("我是匿名对象 add: $info")
        }
        override fun del(info: String) {
            println("我是匿名对象 del: $info")
        }
    }
    p.add("天神")
    p.del("天魔")

    println();

    // 具名实现方式
    val p2 = KtImpl();
    p2.add("悟饭")
    p2.add("比克")

    // 3. 方式一: 对Java的接口, 用 KT[对象表达式方式]
    val p3 : Runnable = object: Runnable {
        override fun run() {
            println("Runnable run...")
        }
    }
    p3.run();

    // 方式二: 对Java的接口, 用 Java 最简洁的方式
    val p4 = Runnable {
        println("简洁Runnable run...")
    }
    p4.run()

    println();

    // 方式一: 对 KT 的接口, 用 KT[对象表达式方式]
    val pk1 = object : RunnableKt {
        override fun run() {
            println("方式一 RunnableKT run")
        }
    }
    pk1.run();

    println();
}

// 具名实现: 具体名字 == KtImpl
class KtImpl: Kt() {
    override fun add(info: String) {
        println("我是具名对象 add: $info")
    }

    override fun del(info: String) {
        println("我是具名对象 del: $info")
    }
}
```