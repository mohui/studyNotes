# 类的关键字学习目录
- lateinit 延迟初始化
- by lazy 惰性加载

## lateinit 延迟初始化
- lateinit val AAA: String; 不能跟val, AAA无法在修改,还怎么延时初始化
- 属于懒加载,用到的时候才加载

```
package com.bjknrt.newbie.example.controller

// 主构造函数
class Kt {
    // lateinit val AAA: String; // AAA 无法后面在修改了, 还怎么延时初始化
    /**
     * 等会在来初始化, 我先定义,所以没有赋值
     */
    lateinit var responseResultInfo: String;
    // 模拟服务器加载
    fun loadRequest() {
        // 延时初始化,属于懒加载, 用到你在给你加载
        responseResultInfo = "服务器加载成功"
    }
    fun showResponseResult1() {
        println("运行一切OK,调用responseResultInfo,值是: $responseResultInfo")
    }
    
    fun showResponseResult2() {
        if (::responseResultInfo.isInitialized) {
            println("运行一切OK,调用responseResultInfo,值是: $responseResultInfo")
        } else {
            println("没有初始化,加载失败")
        }
    }
}
fun main() {
    val p = Kt()
    // 如果没有先调用 println(p.loadRequest()), 就会报错,因为没有加载
    println(p.showResponseResult1())
    
    // 这个不会报错, 里面判断了是否初始化
    println(p.showResponseResult2())
}
```

## by lazy 惰性加载
```
package com.bjknrt.newbie.example.controller

class Kt {
    // 普通方式: 不使用惰性初始化 by lazy, 饿汉式,没有任何懒加载特点
    // val databaseData1: String = readSqlServerDatabaseAction();

    // 使用惰性初始化 by lazy
    val databaseData2: String by lazy { readSqlServerDatabaseAction() };

    private fun readSqlServerDatabaseAction(): String {
        println("开始读取数据库...")
        println("加载读取数据库...")
        println("加载读取数据库...")
        println("读结束取数据库...")

        return "database data load success ok."
    }
}
fun main() {
    val p = Kt()
    // 睡眠五秒钟
    Thread.sleep(5000)
    println();
    // databaseData1方法里的 println()打印的 并没有睡眠五秒,直接就给出了结果,然后等了五秒打印出下面代码
    println("最终调用结果: ${p.databaseData2}")
}
```