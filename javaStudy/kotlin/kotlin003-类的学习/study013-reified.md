# reified
- reified 学习
- inline 内联


## inline 内联
- 在 JVM  上, 定义的 lambda 会以对象实例的形式存在,
- JVM 会为所有同 lambda 打交道的变量分配内存, 这就产生了内存开销
- lambda 的内存开销会带来验证的性能问题
- 
- 使用内联, JVM就不需要使用 lambda 对象实例了, 因而避免了变量内存分配,
- 哪里需要使用 lambda, 编译器就会将函数体 复制粘贴到哪里
- 
- 使用 lambda 的递归函数无法内联, 因为会导致复制粘贴无限循环, 编译会发出警告
```

```

## reified 学习
- reified 关键字的使用很简单： 
- 在泛型类型前面增加 reified 修饰 
- 在方法前面增加 inline

```
package com.bjknrt.newbie.example.controller

  // reified 关键字学习
  data class ObjectClass1(val name: String, val age: Int, val study: String)
  data class ObjectClass2(val name: String, val age: Int, val study: String)
  data class ObjectClass3(val name: String, val age: Int, val study: String)

class Kt {
/**
* 所有功能, 写在函数上
* 默认随机输出一个对象, 如果此对象和用户指定的对象不一致, 我们就启用备用对象, 否则就直接返回对象
*/
inline fun<reified T> randomOrDefault(defaultLambdaAction: () -> T): T? {
val objList: List<Any> =  listOf(
ObjectClass1("obj1 悟空", 30, "练武"),
ObjectClass2("obj2 悟饭", 18, "学习"),
ObjectClass3("obj3 悟天", 9, "泡妞")
)
// 随机产生一个对象,取第一个
val randomObj: Any? = objList.shuffled().first()

        /**
         * T 与 T? 是不同的?
         * 答案: it is T  -> false:  tableIf -> null, null as T 会崩溃, 解决方法 null as T?
         */
        println("您随机产生的对象是 $randomObj")
        // 如果 it 随机产生的对象等于 T类型的, 就会走as T, 直接返回, 不等于T类型, 走下面的备用环节
        return randomObj.takeIf { it is T } as T? ?: defaultLambdaAction()
    }

}
fun main(){
val finalResult = Kt().randomOrDefault {
println("由于随机产生的对象 和 我们指定的 ObjectClass1 不一致, 所以启用备用对象")
ObjectClass1("备用 obj1 李四", 22, "学习C")
}

    println("客户端最终结果${finalResult}")

    println()
}
```