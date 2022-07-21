## 时间格式

### 获取当前日期时间
```
val current = LocalDateTime.now() // 2022-07-20T13:37:56.979110
```
### format
```
val time1 = DateTimeFormatter.ofPattern("HH:mm:ss.SSS") // 13:37:56.979
```

### 获取当前时间
```
val currentTime = LocalTime.now() // 13:37:56.997693
```

### 获取当前时间是周几
```
// 获取当前时间是周几 THURSDAY
val week = LocalDateTime.now().dayOfWeek.name
// 获取当前时间是周几 4
val week = LocalDateTime.now().dayOfWeek.value
```