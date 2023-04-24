## group用法

```
val list = [
    {
        id: 1,
        name: '张三',
        sex: '男'
    },
    {
        id: 2,
        name: '李四',
        sex: '男'
    },
    {
        id: 3,
        name: '马冬梅',
        sex: '女'
    }
]

val listMap: Map<Int, List<list[0]的对象类型>> = list.groupBy { it.sex }

{
    男: [
            {
            id: 1,
            name: '张三',
            sex: '男'
        },
        {
            id: 2,
            name: '李四',
            sex: '男'
        }
    ],
    女: [
        {
            id: 3,
            name: '马冬梅',
            sex: '女'
        }
    ]
}
```
## associateBy用法
```
val associate: Map<Int, QasQuestionsAnswerResult> =
    option2Details.associateBy { it.questionsAnsweredCount }
```