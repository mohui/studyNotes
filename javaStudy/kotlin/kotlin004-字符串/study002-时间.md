# 实现


##### 返回值中对象类
```
data class ClockDayList(
    val start: LocalDateTime,
    val end: LocalDateTime,
    var clockIn: Int = 0,
    var clockInStatus: Boolean = false
) {
}
```

##### 返回值格式
```
data class CalculationCycleResult(
    val start: java.time.LocalDateTime,
    val end: java.time.LocalDateTime,
    val between: kotlin.Long,
    val timeList: List<ClockDayList>
) {

}
```


#### 当前时间转为当前分钟的开始时间和结束时间
- 第一种方法
```
val currentTime = current.toLocalTime()
// 当前分钟的开始时间
val start = currentTime.truncatedTo(ChronoUnit.MINUTES)
// 当前分钟的结束时间
val end = start.plusSeconds(59)
```
- 第二种方法
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

## 时间周期
```
private fun calculationCycle(chronoNum: Int, chronoUnit: ChronoUnit, startDateTime: LocalDateTime?) {
    var start: LocalDateTime? = null
    var end: LocalDateTime? = null
    var between: Long

    val now = LocalDateTime.now()
    between = chronoUnit.between(startDateTime, now) / chronoNum
    val temp = chronoUnit.addTo(startDateTime, between * chronoNum)
    if (temp != null) {
        if (temp.isAfter(now)) {
            start = chronoUnit.addTo(startDateTime, between * chronoNum - chronoNum)
            end = temp
        } else {
            start = temp
            end = chronoUnit.addTo(startDateTime, between * chronoNum + chronoNum)
        }
    }

    println(start)
    println(end)
    println(between)
}
```

##### 非自然周的开始时间和结束时间方法实现
- 可能是多周
```
fun calculationCycle(
    chronoNum: Int,
    chronoUnit: ChronoUnit,
    startDateTime: LocalDateTime
): CalculationCycleResult {
    val start: LocalDateTime
    val end: LocalDateTime
    val between: Long

    val now = LocalDateTime.now()
    between = chronoUnit.between(startDateTime, now) / chronoNum
    val temp = chronoUnit.addTo(startDateTime, between * chronoNum)
    if (temp.isAfter(now)) {
        start = chronoUnit.addTo(startDateTime, between * chronoNum - chronoNum)
        end = temp
    } else {
        start = temp
        end = chronoUnit.addTo(startDateTime, between * chronoNum + chronoNum)
    }

    // 把时间范围划分出来,比如3周,分别给出三周的开始时间和结束时间
    var i: Long = 0;
    val timeList = mutableListOf<ClockDayList>()
    while (i < chronoNum) {
        val clockDayTime = ClockDayList(
            start = chronoUnit.addTo(start, i),
            end = chronoUnit.addTo(start, i + 1)
        )
        timeList.add(clockDayTime)
        i++;
    }

    return CalculationCycleResult(
        start = start,
        end = end,
        between = between,
        timeList = timeList
    )
}
```