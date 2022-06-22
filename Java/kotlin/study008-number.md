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