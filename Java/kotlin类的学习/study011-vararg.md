# vararg
- vararg 动态参数


## vararg 动态参数
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