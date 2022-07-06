# 接口学习
- interface 接口定义
- 默认实现

## interface 接口定义
```
package com.bjknrt.newbie.example.controller

/**
 * 1. 接口里面的所有成员 和 接口本身 都是 public open 的, 所以不需要open, 这个是接口的特殊
 * 2. 接口不能有主构造, 没有构造
 * 3. 实现类不仅仅要重写接口的函数, 也要重写接口的成员
 * 4. 接口实现代码区域, 全部都要增加 override 关键字来修饰
 */
interface IUSB {
    var usbVersionInfo: String // usb版本相关的信息
    var usbInsertDevice: String // USB插入的设备信息
    fun insertUSB(): String
}

// 鼠标USB实现类
class Mouse(override var usbVersionInfo: String = "USB 3.0",
            override var usbInsertDevice: String = "鼠标接入了USB接口"): IUSB {
    override fun insertUSB(): String = "Mouse: $usbVersionInfo $usbInsertDevice";
}

class KeyBoard : IUSB {
    override var usbVersionInfo: String = "USB 3.1"
        get() = field
        set(value) {
            field = value
        }

    override var usbInsertDevice: String = "鼠标接入了USB接口"
        get() {
            println("你get了[${field}]值出去了")
            return field;
        }
        set(value) {
            field = value
            println("你set了[${value}]值进来了")
        }

    override fun insertUSB(): String  = "KeyBoard: $usbVersionInfo $usbInsertDevice"
}

fun main(){

    val iusb1: IUSB = Mouse()
    println(iusb1.insertUSB())

    println()

    val iusb2: IUSB = KeyBoard()
    println(iusb2.insertUSB())
    iusb2.usbInsertDevice = "AAA"

    println()

}

```

## 默认实现
- 一般不要这么用
```
package com.bjknrt.newbie.example.controller

interface IUSB {
/**
* 这样做是不对的, 因为接口成员本来就是用来声明标准的,
* 但是可以在接口成员声明时,完成对接口成员的实现
*
* 1. 接口 var 也是不能给接口的成员赋值的 (有其他办法)
* 2. 任何类 接口 等等, val 代表 只读的, 是不可以在后面动态复制的 (有其他办法)
*/
val usbVersionInfo: String // usb版本相关的信息
get() = (1..100).shuffled().last().toString()
val usbInsertDevice: String // USB插入的设备信息
get() = "高级设备接入USB"
fun insertUSB(): String
}

// 鼠标USB实现类
class Mouse: IUSB {
override val usbInsertDevice: String
get() = super.usbInsertDevice
override val usbVersionInfo: String
get() = super.usbVersionInfo
override fun insertUSB(): String = "Mouse: $usbVersionInfo $usbInsertDevice";
}


fun main(){

    val iusb1: IUSB = Mouse()
    println(iusb1.insertUSB())

    println()

}
```