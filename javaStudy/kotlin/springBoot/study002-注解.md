# 注解的应用
- ImportResource: 导入其他的xml配置文件
- PropertyResource: 读取属性配置文件
- @SpringBootConfiguration
- @EnableAutoConfiguration 启用自动配置
- @ComponentScan 扫描器

## ImportResource
> 导入其他的xml配置文件, 等于在 xml 以下写法
```xml
<import resource = "其他的配置文件"></import>
```
例如:
```java
// 导入多个xml配置文件
@ImportResource(value = {"classpath:applicationContext.xml", "第二个.xml"})
```
## PropertyResource
1. 读取 properties 属性配置文件.
2. 使用属性配置文件可以实现外部化配置, 在程序代码之外提供数据

步骤:
1. 在 resources 目录下, 创建 properties 文件, 使用 k = v 的格式提供数据
2. 在 PropertyResource 指定 properties 文件的位置.
3. 使用 @Value(value="${key}")

## @SpringBootConfiguration
1. 使用了 该注解 标注的类, 可以作为配置文件使用的, 可以使用 Bean声明对象, 注入到容器
## @EnableAutoConfiguration
1. 启用自动配置, 把 Java 对象配置好, 注入到 spring 容器中
2. 例如可以把 mybatis 的对象创建好, 放入到容器中

## @ComponentScan
1. 扫描器, 找到注解, 根据注解的功能创建对象, 给属性赋值等等
2. 默认扫描的包, @ComponentScan 所在的类, 所在的包 和 子包





