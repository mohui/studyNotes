# 注解 Annotation
- 内置注解
- 元注解

## 内置注解
- @Override 重写
- @Deprecated 已过时
- @SuppressWarnings 压制警告

### @Override
- 重写
- 检测被该注解标注的方法是否是继承父类(接口)的

### @Deprecated
- 该注解标注的内容,表示已过时
- 此注解可以用在方法，属性，类上，表示不推荐程序员使用，但是还可以使用

### @SuppressWarnings
- 压制警告

## @Configuration
- 这个注解贴在类上, 表示这个类是一个配置类

## @Bean
- 相当于之前的bean标签, spring会把bean注解方法的返回值交给spring容器进行管理

## @Validated
