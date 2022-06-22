# 类

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