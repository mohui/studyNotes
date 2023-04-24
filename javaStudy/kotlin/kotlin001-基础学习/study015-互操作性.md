# kotlin 互操作性与可空性
- kotlin 和 Java 的互操作性与可空性

## kotlin 和 Java 的互操作性与可空性
- : String! Java 与 Kt 交互的时候, Java 给 Kt 用的纸, 都是 :String! 这种类型
- 只要是看到有 String! 的类型, 在使用的时候 必须 ?.xxx,但是容易忘记写,有风险
- 只要是看到有 String! 的类型, 在使用的时候 必须 : String? 来接收 Java 值

* java 代码
```
public class KtJava {
    public String getInfo1() {
        return "hello word"
    }
    public String getInfo1() {
        return null
    }
}
```

* Kt 代码
```
fun main(){
    // 错误用法
    val ktInfo1 = Kt().info1
    val ktInfo2 = Kt().info2
    
    println(ktInfo1.length)
    // 因为是 null, 所以会报错
    println(ktInfo2.length)
    
    // 正确用法
    val ktInfo1: String? = Kt().info1
    val ktInfo2: String? = Kt().info2
    
    println(ktInfo1?.length)
    println(ktInfo?2.length)
}
```