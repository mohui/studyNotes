# 类的学习
- 计算属性
- 防范竞态条件

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