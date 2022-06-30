- inner 内部类
- 嵌套类
- data 数据类

# inner 内部类
# 嵌套类
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


# data 数据类
```
package com.bjknrt.newbie.example.controller

/**
 * 数据类学习 数据类 data class Kt{}
 * 1. 普通类 与 数据类 的 toString 背后原理
 * 2. == 与 ===
 * 3. 普通类的 == 背后原理
 * 4. 数据类的 == 背后原理
 */

/**
 * 普通类
 * set get 构造函数
 */
class ResponseResultBean1(var msg: String, var code: Int, var data: String): Any() {
}

/**
 * 数据类
 * set get 构造函数 解构操作 copy toString hashCode equals
 */
data class ResponseResultBean2(var msg: String, var code: Int, var data: String) {
}

open class Kt {
}

fun main() {
    // 普通类  :Any() toString mac实现打印了
    println(ResponseResultBean1("login", 200, "登录成功的数据..."))
    // com.bjknrt.newbie.example.controller.ResponseResultBean1@2ef9b8bc

    // 数据类 :Any() 默认重写了父类的 toString 打印子类的 toString 详情
    println(ResponseResultBean2("login", 200, "登录成功的数据..."))
    // ResponseResultBean2(msg=login, code=200, data=登录成功的数据...)

    // Any  父类的 equals 实现 (ResponseResultBean1 对象引用 比较 ResponseResultBean1 对象引用)
    println(
        ResponseResultBean1("login", 200, "登录成功的数据...") ==
                ResponseResultBean1("login", 200, "登录成功的数据...")
    ) // false

    // Any 父类的 equals 被数据类重写了 equals 会调用子类的 equals 函数 (对值的比较)
    println(
        ResponseResultBean2("login", 200, "登录成功的数据...") ==
                ResponseResultBean2("login", 200, "登录成功的数据...")
    ) // true
}

```