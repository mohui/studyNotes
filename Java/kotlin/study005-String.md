# 字符串应用

#### capitalize 首字母大写

```
val name: String = "hello";
name.capitalize() // Hello
```

#### indexOf, substring 用法
```
var str: String = "zhangSan is success result";
val indexOf = str.indexOf('u');
println(indexOf); // 13
val str1 = str.substring(0, 3);
println(indexOf); // zha

val str2 = str.substring(0, indexOf); // zhangSan is s
// 等效于
val str1 = str.substring(0 until indexOf); // zhangSan is s

```

#### split 字符串分割成数组
```
var str: String = "zhangSan is success result";
val indexOf = str.split(' '); // [zhangSan, is, success, result]

val (v1, v2, v3, v4) = indexOf;
// "v1: zhangSan, v2: is, v3: success, v4: result"
return "v1: $v1, v2: $v2, v3: $v3, v4: $v4";
```

#### isBlank 是否为空字符串
```
val name: Sting = "";
var name: String = "";
if (name.isBlank()) {
    return "hello"
} else {
    return "word"
}
// hello
```

#### let的使用, 配合?.
```
var name: String? = null;

// 如果是null, ?后面的不会执行,空字符串: hello,  非空: word
val r = name?.let {
    if (name.isBlank()) {
        "hello"
    } else {
        "word"
    }
}
return r; // null
```

#### 空合并符
```
var name: String? = null;
return name?: "这是默认值" // 这是默认值
```
或
```
var name: String? = null;
return name?.let{it}?: "这是默认值" // 这是默认值
```

#### !!的用法 断言
- 如果能百分之百确定是有值的,才可以用 断言!!,否则会有Java空指针异常的风险

```
var name: String? = "hello";
return name!!.capitalize(); // Hello
```

#### replace 替换用法
```
val pwd: String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

val newPwd: String = pwd.replace(Regex("[A,B,C,D,E,F,Y,Z]")) {
    println(it.value); // A,B,C,D,E,F,Y,Z
    when(it.value) {
        "A" -> "2"
        "E" -> "4"
        "F" -> "6"
        "Y" -> "8"
        "Z" -> "0"
        else -> "3"
    }
}
return newPwd; // 233346GHIJKLMNOPQRSTUVWX80
```

#### forEach字符串
```
val pwd: String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
pwd.forEach{
    println("这是$it") // 每一个字母
}
```
