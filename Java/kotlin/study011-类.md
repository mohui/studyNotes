# 类
- 计算属性
- 防范竞态条件
- 主构造函数
- 次构造函数

## 计算属性
```
class Kt {
    /**
     * private string info = "how are you";
     * public string getInfo() {
     *     return this.info;
     * }
     */
    val info = "how are you"
    
    // 计算属性, 下面这样写, get 函数覆盖了 field 内存本身, 相当于 field 失效了
    val number : Int
        get() = (1..1000).shuffled().first() // 从1到1000 取出随机值, 返回给 getNumber() 函数
}
fun main() {
    // 背后隐式代码 System.out.println(new Kt().getInfo())
    println(Kt().info)
    
    println(Kt().number)
    
    // 报错, 原因是 val 没有 setXXX 的函数,只有 getXXX  函数
    // 背后隐式代码 new Kt().setInfo("hello word");
    Kt().info = "hello word"
}
```

## 防范竞态条件
```
class Kt {
    val info: String ? = "hello"
    
    // 防范静竟态条件 当你调用成员,这个成员可能是 null 和 空字符串, 就必须采用 防范竞态条件, 这是 KT 的规范化
    fun getShowInfo(): String {
        return info?.let {
            if (it.isBlank()) {
                "这个是空字符串,请检查代码"
            }
            else {
                "这个是字符串${it}"
            }
        } ?: "这个是null,请检查代码..."
    }
}
fun main() {
    println(Kt().getShowInfo)   
}
```

## 主构造函数
```
package com.bjknrt.newbie.example.controller

// 主构造函数, 规范来说, 都是增加 _XXX的方式, 临时的输入类型, 不能直接用,需要接收下来 成为变量才能用
class Kt(_name: String, _sex: Char, _age: Int, _info: String) {
    var name = _name
        get() = field // get不允许私有化
        private set(value) {
            field = value
        }
    val sex = _sex
        get() = field
        // set(value) { field = value } val: 只读,不能修改,不能定义 set 函数
    val age = _age
        get() = if (field < 0) -1 else field
    val info = _info
        get() = if (field.isBlank()) "哇塞, 没有值啊" else field
    fun show() {
        println(name)
        println(sex)
        println(age)
        println(info)
    }
}
fun main() {
    val p = Kt(_name = "张三", _sex = '男', _age = 12, _info = "这个人很懒")
    p.show();
}
```

### 次构造函数
```
package com.bjknrt.newbie.example.controller

// 主构造函数
class Kt(name: String) {
    /**
     * 次构造函数, 必须要调用主构造函数, 否则不通过
     * 1: 为什么次构造必须调用主构造?
     * 答: 主构造统一管理 为了更好的初始化设计
     */
    constructor(name: String, sex: Char): this(name) {
        println("2个参数 name: $name, sex: $sex")
    }
    constructor(name: String, sex: Char, age: Int): this(name) {
        println("2个参数 name: $name, sex: $sex, age: $age")
    }
}
fun main() {
    val p = Kt( "张三")
    Kt("张三", '男')
    Kt("张三", '男', 30)
}
```