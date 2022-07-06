# Jvm 的学习
- JvmName
- JvmField
- JvmOverloads

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
     val names = listOf("zhangSan", "liSi", "wangWu")
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

## JvmOverloads
- 编译器环节, 专门重载一个函数, 给Java用, 相当于 Java 享用 Kt 的默认参数
```
package com.bjknrt.newbie.example.controller


fun show(name: String, age: Int = 20, sex: Char = '男') {
     println("name: $name, age: $age, sex: $sex")
}

@JvmOverloads
fun toast(name: String, age: Int = 20, sex: Char = '男') {
     println("name: $name, age: $age, sex: $sex")
}

fun main() {
     show("张三")
     toast("李四")
}

```

## JvmStatic
- JvmStatic 会在外边封装一个函数, 让 Java 像 Kt 一样调用
```
package com.bjknrt.newbie.example.controller

class MyObject {
     companion object {
          @JvmField
          val TARGET = "香山公园"
          @JvmStatic
          fun showAction(name: String) = println("$name 想去 $TARGET 玩耍")
     }
}

fun main() {
     MyObject.TARGET
     MyObject.showAction("张三三")
}

```