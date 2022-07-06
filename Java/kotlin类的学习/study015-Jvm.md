# Jvm 的学习

## JvmName
- 必须写在报名的外边
- 就是在编译器环节, 修改我们类的名字, 让 调用更简洁
```
@file: JvmName("Stu") // 就是在编译器环节, 修改我们类的名字, 让 调用更简洁
package com.bjknrt.newbie.example.controller

fun getStudentNameValueInfo(str: String) = println(str)
fun main(){
}

/**
 * 背后代码 WhhKt 改成了 Stu
public final class WhhKt {
     public static final void getStudentNameValueInfo(@NotNull String str) {
          Intrinsics.checkNotNullParameter(str, "str");
          System.out.println(str);
     }

     public static final void main() {
     }

     // $FF: synthetic method
     public static void main(String[] var0) {
          main();
     }
}
 */
```

## JvmField
```
package com.bjknrt.newbie.example.controller

class Person {
     @JvmField
     val name = listOf("zhangSan", "liSi", "wangWu")
}

/**
 *
public final class Person {
     @NotNull
     private final List name = CollectionsKt.listOf(new String[]{"zhangSan", "liSi", "wangWu"});

     @NotNull
     public final List getName() {
          return this.name;
     }
}
 */

/**
 * 背后代码
 public final class Person {
     @JvmField
     @NotNull
     public final List name = CollectionsKt.listOf(new String[]{"zhangSan", "liSi", "wangWu"});
}
 */
```