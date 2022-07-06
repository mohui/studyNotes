# 合并数组
- zip 合并函数

## zip 合并函数
- 原理: 就是把 第一个集合 和 第二个集合 合并起来, 创建新的集合, 并返回
```
package com.bjknrt.newbie.example.controller

fun main(){
     val names = listOf<String>("孙悟空", "猪悟能", "沙悟净", "唐三藏")
     val ages = listOf<Int>(500, 1000, 800, 35, 5)

     /**
      * 原理: 就是把 第一个集合 和 第二个集合 合并起来, 创建新的集合, 并返回
      *
      * 创建新的集合(元素, 元素, 元素) 元素 Pair(K, V) K 代替 第一个集合的元素, V 代替第二个集合的元素
      */
     val zip: List<Pair<String, Int>> = names.zip(ages)

     println(zip) // [(孙悟空, 500), (猪悟能, 1000), (沙悟净, 800), (唐三藏, 35)]

     println(zip.toMap()) // {孙悟空=500, 猪悟能=1000, 沙悟净=800, 唐三藏=35}

     println(zip.toMutableSet()) // [(孙悟空, 500), (猪悟能, 1000), (沙悟净, 800), (唐三藏, 35)]

     zip.toMap().forEach{ (k, v) ->
          println("姓名是$k, 年龄是$v")
     }
     zip.toMap().forEach{
          println("姓名是${it.key}, 年龄是${it.value}")
     }
     zip.forEach{
          println("姓名是${it.first}, 年龄是${it.second}")
     }

     println()

}

```