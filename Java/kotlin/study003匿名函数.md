# Kotlin函数学习笔记

#### 匿名函数
> 匿名函数属于lambda
```
// hello的长度
val len = "hello".count();
println(len); // 5
```

```
// hello中l的数量 ()可省略
val len2 = "hello".count() {
    it == 'l';
}
println(len2); // 2
```
等效于
```
val len2 = "hello".count {
    it == 'l';
}
println(len2); // 2
```

#### 隐式返回
```
// 第一步: 函数输入输出的声明
val meth : () -> String;
// 第二步: 对上面函数的实现
meth = {
    "hello word"
}
// 第三步: 调用此函数
println(meth());
```

#### 带参数的应用一
> meth(3, 5) 等价于 meth.invoke(3, 5);
```
val meth : (Int, Int) -> String = { num1, num2 ->
    "第一个数$num1, 第二个数$num2"
}
println(meth(3, 5));

val meth : (Int, Int) -> String = { num1, num2 ->
    if (num1 in 0..10)
        "第一个数$num1"
    else
        "第二个数$num2"
}
// meth(3, 5) 等价于 meth.invoke(3, 5);
println(meth(3, 5)); // "第一个数$num1"
return "str";
```

#### 带参数的应用二
> 如果只有一个参数, 会默认有一个it
```
val meth : (Int) -> String = {
    if (it in 0..60)
        "数字不算大"
    else
        "数字挺大的"
}
println(meth.invoke(5));
```

#### 匿名函数的类型推断
```
val addMethod1 = { num1 : Int, num2 : Int ->
    num1 + num2
}
println(addMethod1(2, 3))

val method1 = {
    34.4f
}
println(method1())
```