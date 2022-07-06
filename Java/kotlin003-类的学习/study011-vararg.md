# vararg
- vararg 动态参数
- [] 操作符学习


## vararg 动态参数
1. 泛型是很大的范围类型, 可以接收很多类型, 也可以接受 null, 但是接收null后,要处理好
2. String? 能够接受 "hello" 字符串, 还可以接收null, 所以 String? 比 String 工能强大
3. 异步处理泛型接收, 都用 String? 处理规范化
```
package com.bjknrt.newbie.example.controller

import java.util.Objects

/**
 * vararg 关键字(动态参数)
 * 1. objectArray: Array<T>
 * 2. showObj(index)
 * 3. mapObj(index, 变换 lambda)
 * 4. p.showObj p.mapObj(int -> str)
 * 5. p的类型, it的类型
 */
class Kt<T>(vararg objects: T, var isMap: Boolean) {
    /**
     * 1. objectArray: Array<T>
     * out 我们的 T 只能被读取, 不能修改, T只能读取
     */
    private val objectArray: Array<out T> = objects

    // 2. showObj(index)
    fun showObj(index: Int): T? = objectArray[index].takeIf { isMap }

    // 3. mapObj(index, 变换 lambda)
    fun <O> mapObj(index: Int, mapAction: (T ?) -> O) = mapAction( objectArray[index].takeIf { isMap })
}


fun main(){

    //
    val p: Kt<Any ?> = Kt("张三", false, 123, 123.4f, 2123.34, null, '男', isMap = true);

    println(p.showObj(0))
    println(p.showObj(1))
    println(p.showObj(2))
    println(p.showObj(3))
    println(p.showObj(4))
    println(p.showObj(5))
    println(p.showObj(6))

    // it 的类型 实际上是 {{Comparable<*>? & java.io.Serializable?} 需要 .toString() 转换一下
    var r = p.mapObj(0) {
        it.toString().length
    }
    println("第1个元素的长度是$r")
}
```

## [] 操作符学习
```
package com.bjknrt.newbie.example.controller

class Kt<INPUT>(vararg objects: INPUT, var isR: Boolean = true) {
    private val objectArray: Array<out INPUT> = objects

    operator fun get(index: Int) = objectArray[index].takeIf { isR }
}

// [] 操作符学习

fun main(){

    val p = Kt("张三", "张伟", "孙悟空", "猪八戒", null)

    println("元素${p[2]}")
}


```