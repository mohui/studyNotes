# 标识符
- 四个可以(组成部分): 数字,字母,下划线,美元符合$
- 两个不可以: 不可以数字开头, 不可以使用Java关键字
- 大小写敏感
- 类名: 首字母大写,其余遵循驼峰
- 方法名,变量名: 首字母小写,其余遵循驼峰
- 包名: 全部小写,不遵循驼峰

### 常量
#### 字符常量 [final]
- 一个变量被final修饰,这个变量就变成常量了,值不可变
- 约定俗成的规定: 字符常量的名字大写.
>  eg: final int NUM = 20;

逻辑常量: true; false;

### 变量
- 如果只定义一个变量,没有赋值,相当于没有定义
- 变量没有赋值, 使用会出错
  int age: 定义age为 整数类型

### 数据类型

1. 基本数据类型
- 数值型

| 类型    | 关键字                   |
|-------|-----------------------|
| 整形类型  | bye, short, int, long |
| 浮点型类型 | float, double         |

- 字符型[char]
- 布尔型[boolean]

2. 引用数据类型

| 类型  | 关键字       |
|-----|-----------|
| 类   | class     |
| 接口  | interface |
| 数组  | interface |


#### 整数类型
整数类型默认是int类型

| 类型   | 类型关键字 | 解释             |
|------|-------|----------------|
| long | L或l   | 超出范围必须加,否则可以不加 |



##### int类型
| 类型         | 关键字   |
|------------|-------|
| 前面加0       | 是八进制  |
| 前面加上0x或者0X | 是十六进制 |
| 前面加上0b或者0B | 是二进制  |

#### 浮点类型
浮点类型默认是double类型,关键字为(D或d)一般省略不写

| 类型     | 占用存储空间 | 占用存储空间    | 类型关键字 |
|--------|--------|-----------|-------|
| float  | 4字节    | 有效位数6-7位  | F 或 f |
| double | 8字节    | 有效位数15-16 | D 或 d |
有效数字指从左开始第一个不为0的数
0.0023 有效2位
1.2312 有效5位












