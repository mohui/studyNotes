# 时间格式
## 当前时间
```
// 2022-07-20T13:37:56.979110
val current = LocalDateTime.now()
```
## 当天时间
- 前闭后开
```
// 开始时间
val start = LocalDateTime.now().toLocalDate().atStartOfDay()
// 结束时间
val end = LocalDateTime.now().toLocalDate().plusDays(1).atStartOfDay()
```

## 获取当前年的1月1日0点0分
```
LocalDate.of(LocalDate.now().year, 1, 1).atStartOfDay();
```

## 获取
```markdown
val tomorrow = LocalDateTime.now().toLocalDate().atStartOfDay().plusDays(1)

val monthStartDate = LocalDate.of(LocalDate.now().year, LocalDate.now().month, 1).atStartOfDay()
```

## format 时间转为字符串
```
val startTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
val endTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
```

## 转为 Date 格式
```
val date: Date = Date.from(LocalDate.of(2021, 12, 24).atStartOfDay().toInstant(ZoneOffset.MIN))
```

## 时间
### 获取当前时间
```
// 精度到毫秒
val currentTime = LocalTime.now() // 13:37:56.997693

// 精度到分钟
val currentTimeStart = LocalTime.now().truncatedTo(ChronoUnit.MINUTES) // 13:37

// 精度到分钟(但是会受到毫秒的影响, 毫秒可能会四舍五入到秒中,存在风险)
LocalDateTime.now().withSecond(0).toLocalTime() // 13:37:00.997693
```

### 获取当前时间是周几
```
val week = LocalDateTime.now().dayOfWeek.name // 星期的大写英语字母 THURSDAY
val week = LocalDateTime.now().dayOfWeek.value // 数字 4
```

### 获取当前时间是第几周
```
val week = LocalDateTime.now().get(ChronoField.ALIGNED_WEEK_OF_YEAR) // 数字41(第41周)
```

### 获取指定周的开始时间
```
// 包 
implementation("joda-time:joda-time:2.10.13")
// 当前时间
val now1= org.joda.time.DateTime.now()
// 第一周的开始时间
val time1 = now1.withYear(2022).withWeekOfWeekyear(1).dayOfWeek().withMinimumValue()
// 当前时间是第几周
val weekOfWeekyear = now1.weekOfWeekyear()
val week = weekOfWeekyear.get()
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

```
val s = LocalDate.now()
// 减一天
val e = LocalDate.now().minusDays(1)
val a0 = s.isAfter(s) // false
val a1 = s.isAfter(e) // true
val a2 = e.isAfter(s) // false
```