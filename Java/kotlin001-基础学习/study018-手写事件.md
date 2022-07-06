# kotlin 手写事件变换操作符

##  模仿 RxJava
> 用 Kt 的基础, 模仿手写 RxJava
> 
```
package com.bjknrt.newbie.example.controller

fun main() {
     //  create 输入源, 没有任何参数给你, 你是输出就行(万能类型)
     create {
          // 省略所有类型 T
          "张三"
          123
     }.map {
          "你的值是: $this"
     }.map {
          "[$this]"
     }.observer {
          // 只需要将上面输入的内容, 打印出来即可, 所以不用管输出
          println(this)
     }
}

/**
 * 中转站, 保存我们的记录
 *
 * 主构造, 接收你传递进来的信息, 此消息就是 create 最后一行的返回
 * valueItem === create 操作符 最后一行的返回值, 流向此处了
 */
class RxJavaCoreClassObject<T>(var valueItem: T) {
}

inline fun<I> RxJavaCoreClassObject<I>.observer(observerAction: I.() -> Unit) : Unit {
     observerAction(valueItem)
}

// 变换操作符之map
inline fun<I, O> RxJavaCoreClassObject<I>.map(mapAction: I.() -> O):  RxJavaCoreClassObject<O>{
     return RxJavaCoreClassObject(mapAction(valueItem))
}

inline fun <OUTPUT> create(action: () -> OUTPUT): RxJavaCoreClassObject<OUTPUT> {
     return RxJavaCoreClassObject<OUTPUT>((action()))
}

```