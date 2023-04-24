# 表达式
> 表达式是有返回值的
> java if 是语句, kotlin是表达式
#### range表达式
```
var grade = if (num in 0..60) {
    "不及格"
} else if (num in 60..80) {
    "良好"
} else {
    "优秀"
}
return grade;
```

#### when表达式
```
var str = when(num) {
    1 -> "这个是1"
    2 -> "这个是2"
    3 -> "这个是3"
    else -> {
        println("你好啊${graden} $atm 123.....")
        "呵呵"
    }
}
return str;
```
