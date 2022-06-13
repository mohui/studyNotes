# 字符串应用

#### capitalize 首字母大写

```
val name: String = "hello";
name.capitalize() // Hello
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
