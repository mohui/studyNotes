# 类
- 主构造函数
- constructor 次构造函数
- copy 的使用


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

### constructor 次构造函数
- 如果有默认值, 优先调用主构造
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

### 类次构造函数综合学习笔记
```
package com.bjknrt.newbie.example.controller

// 主构造函数
class Kt(name: String = "王二") {
    /**
     * 初始化块 init代码块
     *
     * 这个不是Java的 static{}
     * 相当于Java的 {} 构造代码块
     */
    init {
        println("主构造调用了多少次")
    }
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
    println()
    Kt("张三", '男')
    println()
    Kt("张三", '男', 30)
}
```

### copy 的使用
- 注意: 默认生成的 toString, copy, hashCode, equals 等等, 只管主构造, 不管次构造
- 注意: 使用 copy 的时候, 必须考虑次构造的内容
```
package com.bjknrt.newbie.example.controller

data class Kt(var name: String, var age:Int) {
    var coreInfo = ""
    init {
        println("主构造被调用了")
    }

    // 次构造
    constructor(name:String): this(name, 99){
        println("次构造被调用")
        coreInfo = "增加非常核心的内容信息"
    }

    override fun toString(): String {
        return "toString name: $name, age: $age, coreInfo: $coreInfo"
    }
    /**
     * 生成的 toString 为什么只有两个参数
     * 答: 默认生成的 toString, copy, hashCode, equals 等等, 只管主构造, 不管次构造
     */
}

fun main(){

    val p1 = Kt("奥特曼")

    println(p1)
    // toString name: 奥特曼, age: 99, coreInfo: 增加非常核心的内容信息

    // 注意: 使用 copy 的时候, 必须考虑次构造的内容
    val p2 = p1.copy("特斯拉", 49)
    // toString name: 特斯拉, age: 49, coreInfo:

    println(p2)

}
```