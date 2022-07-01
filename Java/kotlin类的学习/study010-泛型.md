# 泛型
- 定义泛型类
- 泛型函数学习
- 泛型变换实战
- 泛型类型约束

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

## 泛型函数学习
```
package com.bjknrt.newbie.example.controller

/**
 * 1. 万能对象返回器 Boolean 来控制是否返回 运用 takeIf
 * 2. 四个对象 打印
 * 3. 对象打印 + run + ?:
 * 4. 对象打印 + apply + ?:
 * 5. show(t: T) + apply + ?:
 */
class Kt<T>(private val isR: Boolean, private val obj: T) {
    fun getObj() = obj.takeIf { isR } // true 返回本身 false: 返回null
}

data class Student(val name: String, val age: Int, val sex: Char)
data class Teacher(val name: String, val age: Int, val sex: Char)

fun main(){
    val stu1 = Student("孙悟空", 9, '男')
    val stu2 = Student("克林", 8, '男')

    val tea1 = Teacher("龟仙人", 308, '男')
    val tea2 = Teacher("猫仙人", 1000, '男')

    println(Kt(true, stu1).getObj())

    println()

    println(Kt(false, stu1).getObj() ?: "万能返回器返回null")

    // 3. 对象打印 + run + ?:
    val r = Kt(true, stu2).getObj()?.run {
        println("run 万能对象: $this")
    } ?: println("run 万能返回器返回null")

    // 4. 对象打印 + apply + ?:
    val r3: Teacher = Kt(true, tea1).getObj().apply {
        if (this === null) {
            println("apply 万能返回器返回null")
        } else {
            println("apply 万能对象: $this")
        }
    }!!


    println()

    show("天津饭")
    show(null)

    println()
}

fun <T> show(item: T) {
    // 因为also返回它本身, 和?: 后的unit 冲突 所以类型可以是any
    var r: Any = item?. also {
        println("also 的万能对象 $it")
    } ?: println("also 万能返回器返回null")
}

```

## 泛型变换实战
```
package com.bjknrt.newbie.example.controller

/**
 * 1. 类 isMap map takeIf map 是什么类型
 * 2. map int -> str 最终接收的是什么类型
 * 3. map per -> stu 最终接收的是什么类型
 * 4. 验证是否是此类型与null
 */
class Kt<T>(val isMap: Boolean = false, val inputType: T) {
    /**
     * 模仿 RxJava T 是要变化的输入类型, R是变换后的输出类型
     * 要去map 返回的类型是 R? == 有可能是 R 也有可能是 null
     */
    inline fun<R> map(mapAction: (T) -> R) = mapAction(inputType).takeIf { isMap }
}

inline fun<I, O> map(inputValue: I, isMap: Boolean = true, mapActionLambda:(I) -> O) =
    if (isMap) mapActionLambda(inputValue) else null


fun main(){
    // 2. map int -> str 最终接收的是什么类型
    val p1 = Kt(isMap = true, inputType = 9526)

    // Int? 因为有可能是null, (takeIf: false返回null)
    val r: String? = p1.map {
        it
        it.toString()
    }

    println(r)
    println()

    // 3. map per -> stu 最终接收的是什么类型
    val p2 = Kt(true, Student("孙悟空", 9, '男'))
    val r2 = p2.map {
        Teacher(it.name, it.age, it.sex)
    }
    println(r2)
    println()


    // map 函数, 模仿 rxJava 变换操作
    val r3 = map(123) {
        "map包裹[$it]"
    }
    println(r3)


    println()
}

data class Student(val name: String, val age: Int, val sex: Char)
data class Teacher(val name: String, val age: Int, val sex: Char)

```

## 泛型类型约束
```

```