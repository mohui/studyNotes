# 时间格式

## 日期时间
### 获取当前日期时间
```
val current = LocalDateTime.now()
val week = current.dayOfWeek.name

val formatter1 = DateTimeFormatter.ofPattern("HH:mm:00")
val formatter2 = DateTimeFormatter.ofPattern("HH:mm:59")
val startTime = current.format(formatter1)
val endTime = current.format(formatter2)

val current = LocalDateTime.now() // 2022-07-20T13:37:56.979110
```

## 时间
### 获取当前时间
```
// 精度到毫秒
val currentTime = LocalTime.now() // 13:37:56.997693

// 精度到分钟
val currentTimeStart = LocalTime.now().truncatedTo(ChronoUnit.MINUTES) // 13:37

// 精度到分钟,但是会受到毫秒的影响, 毫秒可能会四舍五入到秒中,存在风险
LocalDateTime.now().withSecond(0).toLocalTime() // 13:37:00.997693
```

### 获取当前时间是周几
```
val week = LocalDateTime.now().dayOfWeek.name // 星期的大写英语字母 THURSDAY
val week = LocalDateTime.now().dayOfWeek.value // 数字 4
```

### 字符串时间转为时间格式
```
val time = DateUtil.parseTime("12:11:12").toLocalDateTime().toLocalTime()
```

### 时间运算-加法
```
当前时间
val currentTime = LocalTime.now() // 12:00:00.000000

// 分钟的加法 -> 加一分钟
val lastMinutesTime = LocalTime.now().plusMinutes(1) // 12:00
// 秒的加法 -> 加59秒
val lastMinutesTime = LocalTime.now().plusSeconds(59)  // 12:00:59
```

#### 当前时间转为当前分钟的开始时间和结束时间
```
// 获取当前时间
val current = LocalDateTime.now()

// 时间
val startTime = current.format(DateTimeFormatter.ofPattern("HH:mm:00"))
val endTime = current.format(DateTimeFormatter.ofPattern("HH:mm:59"))
// 转为时间格式
val start = DateUtil.parseTime(startTime).toLocalDateTime().toLocalTime()
val end = DateUtil.parseTime(endTime).toLocalDateTime().toLocalTime()
```