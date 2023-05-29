#### 定义一个数组
```
data class NameObj(
    val code: String,
    val name: String,
    val age: Int,
    val child: List<Int>? = null
) {}


val list = mutableListOf<NameObj>()
list.add(
    NameObj(
        code = "human",
        name = "张三",
        age = 12,
        child = listOf(34, 3402)
    )
)
list.add(
    NameObj(
        code = "human",
        name = "李四",
        age = 12,
        child = listOf(34, 340202)
    )
)
list.add(
    NameObj(
        code = "divine",
        name = "龙",
        age = 120,
        child = listOf(41, 4127)
    )
)
list.add(
    NameObj(
        code = "divine",
        name = "凤",
        age = 122,
        child = listOf(41, 412723)
    )
)
list.add(
    NameObj(
        code = "beast",
        name = "猪",
        age = 122
    )
)
```
## group用法
```
// 一个参数的
val listGroup = list.groupBy { it.code }
println(listGroup)
// 执行结果
{
    human=[
        NameObj(code=human, name=张三, age=12, child=[34, 3402]), 
        NameObj(code=human, name=李四, age=12, child=[34, 340202])
    ], 
    divine=[
        NameObj(code=divine, name=龙, age=120, child=[41, 4127]), 
        NameObj(code=divine, name=凤, age=122, child=[41, 412723])
    ], 
    beast=[
        NameObj(code=beast, name=猪, age=122, child=null)
    ]
}

// 两个参数的
val listGroup1 = list.groupBy({it.code } , {it.child})
println(listGroup1)
{human=[[34, 3402], [34, 340202]], divine=[[41, 4127], [41, 412723]], beast=[null]}
```
## associateBy 用法
```
val listGr = list.associateBy { it.code }
println(listGr)
// 执行结果
{
    human=NameObj(code=human, name=李四, age=12, child=[34, 340202]), 
    divine=NameObj(code=divine, name=凤, age=122, child=[41, 412723]), 
    beast=NameObj(code=beast, name=猪, age=122, child=null)
}
```