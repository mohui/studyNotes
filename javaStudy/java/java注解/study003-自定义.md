# 自定义注解
- 使用 @interface 自定义注解时, 自动继承了 java.lang.annotation.Annotation 接口
- @interface 用来声明一个注解, 格式是: public @ interface 注解名{定义内容}
- 其中的每一个方法上是声明了一个配置参数
- 方法的名称就是参数名称
- 返回值类型就是参数的类型(返回值只能是基本类型,Class, String, enum)
- 可以通过 default 来声明参数的默认值
- 如果只有一个参数成员, 一般参数名为value
- 注解元素必须要有值, 我们定义注解元素时, 经常使用空字符串, 0作为默认值.
- 注解的参数: 参数类型 + 参数名()