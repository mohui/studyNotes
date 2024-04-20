### 通过require导入包的时候应该使用var/let还是const？
> 导入包的目的是使用包而不是修改包，所以导入包时使用const接受。

### exec、 execFile、 spawn和fork都是做什么用的？
> 1. exec可以用操作系统原生的方式执行各种命令，如管道 cat ab. txt |  grep hello。 
> 2. execFile用于执行一个文件。 
> 3. spawn负责在流式和操作系统之间进行交互。 
> 4. fork负责在两个 Node. js程序（ JavaScript）之间进行交互。

### express项目的目录大致是什么结构的？

> 1. 首先，执行安装 express的指令：npm install express-generator-g。
> 2. 然后，通过 express指令创建项目：express icketang。

- 创建的项目目录结构如下。 
> - ./app.js  应用核心配置文件（入口文件） 
> - ./bin  存放启动项目的脚本文件 
> - ./ package.json  存储项目的信息及模块依赖 
> - ./public 静态文件（css、js、img等） 
> - ./routes 路由文件（MVC中的 contro1ler） 
> - ./views 页面文件（jade模板）

### express常用函数有哪些？

- express .Router—路由组件 
- app.get—路由定向。 
- app. configure——配置。 
- app.set一设定参数。 
- app.use——使用中间件。

### express  response有哪些常用方法？

> 1. res. download( )，弹出文件下载。 
> 2. res.end ( )，结束响应。 
> 3. res.json( )，返回json。 
> 4. res.jsonp( )，返回 jsonp。 
> 5. res .redirect ( )，重定向请求。 
> 6. res .render ( )，渲染模板。 
> 7. res.send ( )，返回多种形式数据。 
> 8. res.sendFile  ( )，返回文件。 
> 9. res.sendStatus( )，返回状态。

### express中如何获取路由的参数？

> 执行的命令如下
```
/users/：name
```
> 使用 req.params.name来获取；
> 使用req.body.username来获得表单传入参数 username；
> express的路由支持常用通配符有？、+、*、( )。

### express  response有哪些常用方法？

> 1. res. download( )，弹出文件下载。 
> 2. res.end ( )，结束响应。 
> 3. res.json( )，返回json。 
> 4. res.jsonp( )，返回 jsonp。 
> 5. res .redirect ( )，重定向请求。 
> 6. res .render ( )，渲染模板。 
> 7. res.send ( )，返回多种形式数据。 
> 8. res.sendFile  ( )，返回文件。 
> 9. res.sendStatus( )，返回状态。

### 说说线程与进程的区别。

> 1. 一个程序至少有一个进程，一个进程至少有一个线程
> 2. 线程的划分尺度小于进程，使得多线程程序的并发性高。 
> 3. 进程在执行过程中拥有独立的内存单元，而多个线程共享内存，极大地提高了程序的运行效率。 
> 4. 线程在执行过程中与进程有区别。每个独立的线程都有程序运行的入口、顺序执行序列和程序的出口。
但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制。 
> 5. 从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。 
但操作系统并没有将多个线程看作多个独立的应用来实现进程的调度、管理和资源分配。这是进程和线程的主要区别。

### 谈谈栈和堆的区别。
> 栈（ stack）区由编译器自动分配和释放，存放函数的参数值、局部变量的值等。 
> 堆（heap）区一般由程序员分配和释放，若程序员不释放，程序结束时可能由OS回收。

> 堆（数据结构）可以被看成一棵树，如堆排序。
> 栈（数据结构）是一种先进后出的数据结构。
