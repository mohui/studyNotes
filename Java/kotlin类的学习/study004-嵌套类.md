# 内部类 嵌套类
```
package com.bjknrt.newbie.example.controller

/**
 * 内部类学习 关键字: inner
 *
 * 内部类的特点: 内部的类 能访问 外部的类
 *             外部的类 能访问 内部的类
 */
class Body(_bodyInfo: String) {
    val bodyInfo = _bodyInfo;

    fun show(){
        Heart().run();
    }

    /**
     * 心脏类
     * 默认情况下: 内部的类 不能访问 外部的类, 要增加 修饰符 inner 成为 内部类 才可以访问外部类
     */
    inner class Heart {
        fun run() = println("心脏访问身体信息$bodyInfo")

    }
    // 肾脏类
    inner class Kidney {
        fun work() = println("肾脏访问身体信息$bodyInfo")
    }
    // 手
    inner class Hand {
        // 左手类
        inner class LeftHand {
            fun run() = println("肾脏访问身体信息$bodyInfo")
        }
        // 右手类
        inner class RightHand {
            fun run() = println("肾脏访问身体信息$bodyInfo")
        }
    }
}

/**
 * 嵌套类
 * 默认情况下, 就是嵌套类关系
 * 嵌套类特点: 外部的类 能访问 内部的嵌套类, 内部的类 不能访问外部的成员
 */
class Outer {
    val info: String = "ok";
    fun show() {
        Nested().output();
    }
    class Nested {
        fun output() = println("嵌套类");
    }
}

open class Kt {
}

fun main() {
    Body("isOk").Heart().run();
    Body("isOk").Hand().LeftHand().run();
    Body("isOk").Hand().RightHand().run();
    Outer.Nested().output();
}

```