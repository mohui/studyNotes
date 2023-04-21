## 反射

### 反射的主要作用：
```
获得类的信息
动态创建对象
获得属性值和调用方法
```

### 反射创建类的对象
```
类名.class
对象.getClass() 
Class.forName("类的全名") 
Constructor.newInstance(Object... initargs) 
```

### 主要类
```

Class类 代表类的实体，在运行的Java应用程序中表示类和接
Field类 代表类的成员变量（成员变量也称为类的属性）
Method类 代表类的方法
Constructor类 代表类的构造方法
Annotation类 代表类的注解
```

### Class： java.lang.Class 类对象
```
getName() 获得类名（加包结构）
getPackage() 获得类的包结构
getSimpleName() 获得类名
getSuperClass() 获得父类的类对象
getInterfaces() 获得所有实现的接口

isAnnotationPresent(Class<T> annotationClass) 判断类上面是否有对应的annotationClass注解
getAnnotations() 获取本类和父类上面的所有的注解
getDeclaredAnnotations() 获取本类上面所有的注解
getAnnotation(Class<T> annotationClass) 获取本类或父类上面 的annotationClass注解
getDeclaredAnnotation(Class<T> annotationClass) 获取本类上面的annotationClass注解
getAnnotationByType(Class<T> annotationClass) 获取该类或 父类上面的annotationClass注解数组
getDeclaredAnnotationsnByType(Class<T> annotationClass)获取本类上面的annotationClass注解数组
getField(String fieldname） 获得类或父类的某个公共属性对象。
getFields() 获得类或父类的所有公共属性对象。
getDeclaredField(String fieldname) 获得本类的某个属性对象
getDeclaredFields() 获得本类的所有属性对象
getConstructor(Class ʢ<?> parameterTypes)获得该类中与参数类型匹配的公有构造方法
getConstructors()获得该类的所有公有构造方法
getDeclaredConstructor(Class<?>parameterTypes)获得该类中 与参数类型匹配的构造方法
getDeclaredConstructors() 获得该类所有构造方法
getMethod(String methodname, Class.<?> parameterTypes)获得该类或父类的某个公有的方法，方法名是methodname，方法参数类型是 parameterTypes 
getMethods() 获得该类及父类所有公有的方法
getDeclaredMethod(String name, Class...<?> parameterTypes) 获得该类某个方法
getDeclaredMethods() 获得该类的所有方法
```

### Field：表示属性对象
```
getName() - 返回属性的名称
getType() 返回属性类型的Class对象
getGenericType() 返回属性对象的Type对象
getModifier() - 以整数形式返回字段的修饰符
isAnnotationPresent(Class<T> annotationClass) 判断属性 上面是否有对应的annotationClass注解
getAnnotation(Class<T> annotationClass) 获取属性上面的 annotationClass注解
set(classObject,value) - 使用指定的值设置字段的值
get(classObject) - 获取字段的值
setAccessible(boolean) - 使私有字段可访问
```
### Method：表示普通方法对象
```
getName() - 返回方法的名称
getModifiers() - 以整数形式返回方法的访问修饰符
getReturnType() - 返回方法的返回值类型
getGenericReturnType() 返回方法的返回值类型
invoke(Object obj, Object ʢ args) 传递object对象及参数调用该对象对应的方法
getParameterTypes() 返回方法所有参数的Class类型
getGenericParameterTypes() 返回方法所有参数的Type类型
getAnnotation(Class<T> annotationClass) 获取方法上面的annotationClass注解
getParameterAnnotations() 获取方法参数上的所有注解，返回的是注解类型的二维数组，每一个方法的参数包含一个注解数组。
isAnnotationPresent(Class<T> annotationClass) 判断方法上是否有对应的annotationClass注解
setAccessible(boolean) - 使私有方法可访问
```
### Constructor：表示构造方法对象
```

getName() - 返回方法的名称
newInstance(Object ʢ initargs) 根据传递的参数创建类的对象（调用对应的有参构造，来创建对象）
getAnnotation(Class<T> annotationClass) 获取构造函数上面的annotationClass注解
isAnnotationPresent(Class<T> annotationClass) 判断方法上是否有对应的annotationClass注解
setAccessible(boolean) - 使私有方法可访问
```
```
其中Class、和Constructor都拥有一个newInstance方法，都可以用来实 例化对象。但是: 
Class.newInstance() 只能够调用无参的构造函数，即默认的构造函 数； 如果该类的无参构造已经被私有化则会抛出IllegalAccessException 异常
Constructor.newInstance(Object... initargs) 可以根据传入的参数，调用任意构造构造函数。

```