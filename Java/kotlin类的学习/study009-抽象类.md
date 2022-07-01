# 抽象类
- abstract 抽象类

## abstract 抽象类
```
package com.bjknrt.newbie.example.controller

import ch.qos.logback.core.net.LoginAuthenticator


abstract class BaseActivity{
    fun onCreate() {
        setContentView(getLayoutID())

        initView()
        initData()
        initXXX()
    }
    private fun setContentView(layoutID: Int) = println("加载{${layoutID}}布局XML中")
    abstract fun getLayoutID(): Int
    abstract fun initView()
    abstract fun initData()
    abstract fun initXXX()
}

class MainActivity : BaseActivity() {
    override fun getLayoutID(): Int = 123

    override fun initView() = println("做具体初始化 view 的实现")

    override fun initData() = println("做具体初始化 data 的实现")

    override fun initXXX() = println("做具体初始化 xxx 的实现")

    fun show() {
        super.onCreate()
    }
}
```