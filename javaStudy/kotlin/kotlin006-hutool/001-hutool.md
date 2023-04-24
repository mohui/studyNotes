# cn.hutool包的常用API
1. 参考
入门和安装 (hutool.cn)
https://blog.csdn.net/qq_15717719/article/details/112149994 http://www.360doc.com/content/21/1130/10/77916903_1006517283.shtml

2. 环境
jdk1.7版本，则应当使用hutool 4.x版本 JDK1.8+，则应当使用hutool 5.x+版本
3. 依赖
```html
<!-- https://mvnrepository.com/artifact/cn.hutool/hutool-all --> 
<!--Hutool是一个小而全的Java工具类库，通过静态方法封装，降低相关API的学习成本，提高工作效率， 使Java拥有函数式语言般的优雅。-->
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.3.7</version>
</dependency>

```
4. 包含组件
一个Java基础工具类，对文件、流、加密解密、转码、正则、线程、XML等JDK方法进行封装，组成各种 Util工具类， 
同时提供以下组件，可以根据需求对每个模块单独引入，也可以通过引入hutool-all方式引入所有模块。

|        第一列         |                                             第二列 |
|:------------------:|------------------------------------------------:|
|     hutool-aop     |                         JDK动态代理封装, 提供非IOC下的切面支持 |
| hutool-bloomFilter |                            布隆过滤,提供一些Hash算法的布隆过程 |
|    hutool-cache    |                                          简单缓存实现 |
|    hutool-core     |                    核心, 包括 Bean 操作, 日期, 各种Util 等 |
|    hutool-cron     |                    定时任务模块, 提供类 Crontab 表达式的定时任务 |
|   hutool-crypto    |                    定时任务模块, 提供类 Crontab 表达式的定时任务 |
|     hutool-db      |                  	JDBC封装后的数据操作，基于ActiveRecord思想 |
|     hutool-dfa     |                                 	基于DFA模型的多关键字查找 |
|    hutool-extra    | 	扩展模块，对第三方封装（模板引擎、邮件、Servlet、二维码、Emoji、FTP、分词等） |
|    hutool-http     |                  	基于HttpUrlConnection的Http客户端封装 |
|     hutool-log     |                                  	自动识别日志实现的日志门面 |
|   hutool-script    |                            	脚本执行封装，例如Javascript |
|   hutool-setting   |                 	功能更强大的Setting配置文件和Properties封装 |
|   hutool-system    |                               	系统参数调用封装（JVM信息等） |
|    hutool-json     |                                         	JSON实现 |
|   hutool-captcha   |                                        	图片验证码实现 |
|     hutool-poi     |                            	针对POI中Excel和Word的封装 |
|   hutool-socket    |                        	基于Java的NIO和AIO的Socket封装 |
|     hutool-jwt     |                       	JSON Web Token (JWT)封装实现 |


