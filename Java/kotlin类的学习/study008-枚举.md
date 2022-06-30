- enum 枚举

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