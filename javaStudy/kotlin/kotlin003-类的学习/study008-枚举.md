# 枚举的应用
- enum 枚举
- enum 枚举进阶版本
- 代数数据类型
- sealed 密封类

## enum 枚举
- 枚举的值, 等价于 枚举本身
```
package com.bjknrt.newbie.example.controller

enum class Week {
    星期一,
    星期二,
    星期三,
    星期四,
    星期五,
    星期六,
    星期日
}

fun main(){

    println(Week.星期六) // 星期六
    // 枚举的值, 等价于 枚举本身
    println(Week.星期六 is Week) // true

    println()

}

```

## enum 枚举进阶版本
```
package com.bjknrt.newbie.example.controller

/**
 * 注意: 更新的时候要改为数据类
 */
data class LimbsInfo(var limbsInfo: String, var length: Int) {
    fun show() {
        println("${limbsInfo}的长度是$length")
    }
}

// 枚举的值, 等价于 枚举本身
enum class Week {
    星期一,
    星期二,
    星期三,
    星期四,
    星期五,
    星期六,
    星期日
}

/**
 * limbs 这个时候在定义单调的 枚举值, 就报错了, 所有的枚举值 必须保持一致
 * 枚举的 主构造 参数 必须和 枚举 的参数保持一致
 */
enum class Limbs(private val limbsInfo: LimbsInfo) {
    LEFT_HAND(LimbsInfo("左手", 5)),
    RIGHT_HAND(LimbsInfo("右手", 5)),
    LEFT_FOOT(LimbsInfo("左脚", 5)),
    RIGHT_FOOT(LimbsInfo("右脚", 5));

    fun show() = "四肢之${limbsInfo.limbsInfo}的指头有${limbsInfo.length}个"

    // 更新枚举
    fun updateData(limbsInfo: LimbsInfo) {
        this.limbsInfo.limbsInfo = limbsInfo.limbsInfo;
        this.limbsInfo.length = limbsInfo.length;
        println("更新后的数据是: ${this.limbsInfo}")
    }
}

fun main(){

    // 枚举的基本用法
    println(Week.星期六) // 星期六
    // 枚举的值, 等价于 枚举本身
    println(Week.星期六 is Week) // true

    println()

    // 枚举的进阶用法
    println(Limbs.LEFT_FOOT.show())

    println()

    Limbs.LEFT_FOOT.updateData(LimbsInfo("左手哈喽", 9))

    println()

}

```

## 代数数据类型
- when表达式 使用枚举类型来做判断处理的, 这个就属于代数数据类型, 就不需要写else
```
package com.bjknrt.newbie.example.controller

import kotlin.math.E

/**
 * 由于我们的show函数,是使用枚举类型来做判断处理的, 这个就属于代数数据类型, 就不需要写else
 */

enum class Exam {
    Fraction1, // 差
    Fraction2, // 及格
    Fraction3, // 良好
    Fraction4, // 优秀
}

// 普通类
class Kt(private val exam: Exam) {
    fun show() =
        when(exam) {
            Exam.Fraction1 -> "该学生成绩极差"
            Exam.Fraction2 -> "该学生成绩及格"
            Exam.Fraction3 -> "该学生成绩良好"
            Exam.Fraction4 -> "该学生成绩优秀"
            // else -> 由于我们的show函数,是使用枚举类型来做判断处理的, 这个就属于代数数据类型, 就不需要写else
            // 因为when表达式已经很明确了, 就只有四种数据类型
        }
}

fun main(){

    println(Kt(Exam.Fraction4).show())

    println()

}

```

## sealed 密封类
```
package com.bjknrt.newbie.example.controller

/**
 * 密封类, 我们成员,就必须有类型 并且 继承本类
 *
 * 需求: 得到优秀的孩子姓名
 */

sealed class Exam {
    // Fraction1 - Fraction3 都不需要任何成员,所以一般写成 object 单例
    object Fraction1: Exam() // 差
    object Fraction2: Exam() // 及格
    object Fraction3: Exam() // 良好
    class Fraction4(val studentName: String): Exam() // 优秀
}

// 普通类
class Kt(private val exam: Exam) {
    fun show() =
        when(exam) {
            is Exam.Fraction1 -> "该学生成绩极差"
            is Exam.Fraction2 -> "该学生成绩及格"
            is Exam.Fraction3 -> "该学生成绩良好"
            is Exam.Fraction4 -> "该学生成绩优秀,他的姓名是: ${(this.exam as Exam.Fraction4).studentName}"
        }
}

fun main(){

    println(Kt(Exam.Fraction1).show())
    println(Kt(Exam.Fraction4("贝吉塔")).show())

    // true === 必须对象引用, object是单例, 只会实例化一次
    println(Exam.Fraction1 === Exam.Fraction1)
    println(Exam.Fraction1 == Exam.Fraction1)

    // false class 有两个不同的对象, 所以是false
    println(Exam.Fraction4("贝吉塔") === Exam.Fraction4("贝吉塔"))
    println(Exam.Fraction4("贝吉塔") == Exam.Fraction4("贝吉塔"))

    println()

}

```

## 获取枚举的值
```
package com.bjknrt.user.permission.centre.enum

import com.fasterxml.jackson.annotation.JsonProperty

/**
 *
 * Values: ADMIN,REGION_ADMIN,DOCTOR,NURSE,PATIENT
 */
enum class RoleCodeEnum(val value: kotlin.String) {

    /**
     * 管理员
     */
    @JsonProperty("ADMIN") ADMIN("ADMIN"),

    /**
     * 行政管理员
     */
    @JsonProperty("REGION_ADMIN") REGION_ADMIN("REGION_ADMIN"),

    /**
     * 医生
     */
    @JsonProperty("DOCTOR") DOCTOR("DOCTOR"),

    /**
     * 护士
     */
    @JsonProperty("NURSE") NURSE("NURSE"),

    /**
     * 患者
     */
    @JsonProperty("PATIENT") PATIENT("PATIENT")
}


```
```
val list = RoleCodeEnum.values().map { it.name }.toMutableList()
```