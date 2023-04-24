## 引入
```markdown
// 转json
implementation("com.google.code.gson:gson:2.8.5")
```

## 转为json格式
```markdown
val gson = Gson()
gson.toJson(要转的对象)

val paramWeeks: Array<String> = gson.fromJson(forIt.optionValue, Array<String>::class.java)
```


## hutool字符串转数组
```markdown
implementation("cn.hutool:hutool-all:5.8.11")

val arrayJson = "['张三', '李四']"
val paramWeeks: Array<String> = JSONUtil.parseArray(arrayJson).toArray(arrayOf<String>())
```