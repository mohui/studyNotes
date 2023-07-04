## 监听注解


### @EventListener
> `@EventListener`注解用于标记一个方法，使其成为Spring的事件监听器。当事件触发时，被标记的方法会被自动调用。

- 示例注解
```
@EventListener(condition = "#root.event.healthManage.knHealthManageType=='ACUTE_CORONARY_DISEASE'")
```
>条件表达式的语法为#root.event，表示获取事件的根对象，
然后使用.运算符访问其属性。这里的事件类型是healthManage，可能是一个自定义的事件对象，
它有一个名为knHealthManageType的属性。

>整个条件表达式的含义是：当触发的事件的healthManage属性中的knHealthManageType等于'ACUTE_CORONARY_DISEASE'时 ，才执行被标记的方法。