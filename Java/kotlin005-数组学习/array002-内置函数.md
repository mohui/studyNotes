# 内置函数
- shuffled 随机打乱
- joinToString 数组分割成字符串


## shuffled 随机打乱
```
fun main() {
    val list = (1..100).shuffled(); // 1 - 100 随机打乱
    val number = list.first() // 取第一位数
    
    println(list.count()) // 长度是 100
    println(number)
}
```

## joinToString 数组分割成字符串
```markdown
val frequency = frequencys.joinToString(",")
```