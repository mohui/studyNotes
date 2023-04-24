# 过滤
- filter 过滤


## filter 过滤
```
package com.bjknrt.newbie.example.controller

fun main(){
     val list: List<Int> = listOf<Int>(2, 4, 6, 5)
     val list1 = list.filter {
          it % 2 == 0
     }
     println(list1)


     val strList = listOf<String>("周一", "周二", "下周一", "周三", "下周四")
     val strList1 = strList.filter {
          // it.startsWith("周")
          it.contains("一")
     }
     println(strList1)

}
```