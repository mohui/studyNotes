# 数字类型
- 转为Int
- Double
- Double转Int
- 随机数
- 运算
- isPrime 质数

| 类型     | 位   | 最大值                    | 最小值                  |
|--------|-----|------------------------|----------------------|
| Byte   | 8   | 127                    | -128                 |
| Short  | 16  | 32767                  | -32768               |
| Int    | 32  | 2147483647             | -2147483648          |
| Long   | 64  | 9223372036854775807    | -9223372036854775808 |
| Float  | 32  | 3.4028235E38           | 1.4E-45              |
| Double | 64  | 1.7976931348623157E308 | 4.9E-324             |


#### 转为Int
```
// 不建议使用 如果是double类型会报错
var num1: Int = "234".toInt(); // 234

// 建议使用, 如果是double类型会返回null
var num3: Int? = "234.5".toIntOrNull(); // null
```

#### Double
```
// 保留三位小数,且四舍五入, 注意是 String 类型
var num3: String = "%.3f".format(23.123678); // 23.124
```

#### Double转Int
```
// 向下取整
println(23.534.toInt()) // 23

// 四舍五入
println(23.534.roundToInt()); // 24
println(23.234.roundToInt()); // 23

```

## 随机数
```
// 计算属性, 下面这样写, get 函数覆盖了 field 内存本身, 相当于 field 失效了
val number : Int
    get() = (1..1000).shuffled().first() // 从1到1000 取出随机值, 返回给 getNumber() 函数
```

### 运算
```
// 乘法
val number: Int = 9
num.times(4) // 36
```

### isPrime 质数
```
package com.bjknrt.newbie.example.controller

fun Int.isPrime(): Boolean {
    (2 until this).map {
        if(this % it  == 0) return false
    }
    return true
}

fun main() {
    val toList: List<Int> = (1..1000).toList().filter { it.isPrime() }.take(10);

    println(toList)
}
```