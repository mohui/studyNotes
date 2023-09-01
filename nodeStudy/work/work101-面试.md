[面试题](https://blog.csdn.net/weixin_44767973/article/details/127705276)

### require和import的区别
> import和require都是被模块化所使用。在ES6当中，用export导出接口， 用import引入模块。
但是在node模块中，使用module.exports/exports导出接口，使用require引入模块，

区别一：出现的时间不同。
require表示的是运行时加载/调用，所以理论上可以运用在代码的任何地方。
import表示的是编译时加载（效率更高），由于是编译时加载，所以import命令会提升到整个模块的头部。
import输入的变量是只读的，引用类型可以，其他模块也可以读到改后的值，但不建议修改。
import是静态执行，不能使用表达式和变量。
```
// 报错
import { 'f' + 'oo' } from 'my_module';
// 报错
let module = 'my_module';
import { foo } from module;
```

import是Singleton模式。
```ts
import { foo } from 'my_module';
import { bar } from 'my_module';
// 等同于
import { foo, bar } from 'my_module';
// 虽然foo和bar在两个语句加载，但是他们对应的是同一个my_module实例
```

Singleton模式。
> 即单例模式，属于创建类型的一种常用的软件设计模式。
通过单例模式的方法创建的类在当前的进程中只有一个实例
（根据需要，也有可能一个线程中属于单列模式，如：仅线程上下文内使用同一个实例）。

>定义：：保证一个类仅有一个实例，并提供一个访问它的全局访问点（类似node的global）。

#### 遵循的模块化规范不同。
> - require是AMD规范引入方式。
> - import是ES6的一个语法标准，如果要兼容浏览器的话必须转化成ES5的语法。
#### 本质
> require是赋值过程。module.exports后面的内容是什么，require的结果就是什么，
    比如对象、数字、字符串、函数等，然后再把require的结果赋值给某个变量，它相当于module.exports的传送门。  
import是结构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，
    也仅仅是将ES6转码为ES5再执行，import语法会被转码为require。  
import虽然是es6中的语法，但就目前来说，所有的引擎都还没有实现import。  
import语法实际上会被转码为require。这也是为什么在模块导出时使用module.exports，
    在引入模板时使用import仍然起效，因为本质上，import会被转码为require去执行。
