# kotlin 语法中异常处理与自定义异常


#### 自定义异常处理
```
// 哈哈com.bjknrt.newbie.example.controller.CustomException: 代码有些许的不严谨
fun word() {
    try {
        var info: String? = null;
        checkException(info);
        println(info!!.length);

    } catch (e: Exception) {
        println("哈哈$e")
    }
}
fun checkException(info: String?) {
    info ?: throw CustomException();
}
class CustomException: IllegalArgumentException("代码有些许的不严谨")
```

#### 判断非空
```
var value1: String? = null;
// 判断非空
checkNotNull(value1); // Required value was null.
// 判断非空
requireNotNull(value1); // Required value was null.
```

#### require(Boolean);
```
var value2: Boolean = false;
require(value2); // Failed requirement
```