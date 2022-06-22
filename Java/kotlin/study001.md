## 基本语法

| 关键字   | 用法           | 
|-------|--------------|
| var   | 可读可写         |
| val   | 只读类型的变量      |
| const | 常量(不适用于局部变量) |


```javascript
/**
 * | var  | name | String | Hello |
 * |------|------|--------|-------|
 * | 可读可写 | 变量   | 类型     | 值     |
 */
// 显式给定的类型在这里是多余的
var name : String = "Hello Word"

```

#### 常量
> 编译时常量只能在函数之外定义,
```
const val PI = 3;
```

#### string 模板
```
println("你好啊${graden} $atm 123.....")
```

#### 反引号
> 如果方法名是关键字,加上反引号就可以了
```
// in is 在Java是普通
public class Aclass {
    public static final void is() {
    }
}
// in is 在Kotlin是关键字,使用反引号就可以了
Aclass.`is`()
```