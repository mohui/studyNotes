# 注解
- @RestController
- @Controller
- @Controller
- @Transactional

## @RestController
1. @RestController 是 @controller 和 @ResponseBody 的结合

## @Controller
- @Controller 将当前修饰的类注入SpringBoot IOC容器，使得从该类所在的项目跑起来的过程中，这个类就被实例化。

## @ResponseBody
- @ResponseBody 它的作用是指: 该类中所有的API接口 返回的数据，
- 无论你对应的方法返回Map或是其他Object，它都会以 Json字符串 的形式返回给客户端

## @Autowired
- @Autowired 可以对成员变量、方法和构造函数进行标注，来完成自动装配的工作
- @Autowired标注可以放在成员变量上，也可以放在成员变量的set方法上，也可以放在任意方法上表示，
- 自动执行当前方法，如果方法有参数，会在IOC容器中自动寻找同类型参数为其传值。
- 这里必须明确：@Autowired 是根据 类型 进行自动装配的，如果需要按名称进行装配，则需要配合@Qualifier使用；

## @Transactional

```markdown
@Transactional(rollbackFor = [Exception::class])
```