service

```markdown
data class GroupNode(
    val key: LocalDateTime,
    var keyUnit: TimeServiceUnit? = null, // 为null说明未分组
    var value: MrClockIn? = null,
    var child: MutableList<GroupNode>? = null // 为null说明未分组
)
```


```markdown
override fun getClockIn(
        startDateTime: LocalDateTime,
        healthPlanId: Id,
        frequency: HealthPlanRule
    ): FrequencyClockResult {
        println("---------------------------------------有效打卡统计-------------------------------------------------------------")

        // 获取最大时间范围
        val timeObj = this.calculationCycle(
            frequency.frequencyTime,
            frequency.frequencyTimeUnit,
            startDateTime
        )
        val endDateTime = timeObj.end

        // 获取最大时间范围内的所有打卡记录
        val clockInList = clockInTable
            .select()
            .where(MrClockInTable.KnHealthPlanId eq arg(healthPlanId))
            .where(MrClockInTable.KnCreatedAt gte arg(startDateTime))
            .where(MrClockInTable.KnCreatedAt lt arg(endDateTime))
            .find()
        println(clockInList)

        // 计算逻辑
        // 准备原始分组数据
        val originMap = clockInList
            .map {
                GroupNode(it.knCreatedAt, null, it, null)
            }.groupingBy { it.key }.fold({ k, t -> GroupNode(k, null, null, mutableListOf(t)) }) { _, r, t ->
                r.child?.add(t)
                r
            }
        // 深度分组
        val newMap = groupByFrequency(frequency, originMap)
        println(newMap)
        // 输出 frequency 统计数据
        val num = newMap.values.size

        return FrequencyClockResult(
            frequencyTime = frequency.frequencyTime,
            frequencyTimeUnit = frequency.frequencyTimeUnit,
            frequencyNum = frequency.frequencyNum,
            frequencyNumUnit = frequency.frequencyNumUnit,
            actualNum = num,
            isQualified = true
        )
    }
```
```markdown
/**
     * 根据频次深度分组
     */
    private fun groupByFrequency(
        frequency: HealthPlanRule,
        originMap: Map<LocalDateTime, GroupNode>
    ): Map<LocalDateTime, GroupNode> {

        val timeServiceUnit = frequency.frequencyNumUnit
        var resultMap = originMap

        frequency.children?.let {
            resultMap = groupByFrequency(it, resultMap)
        }

//        Duration

        return resultMap.values
            .groupingBy {
                if (frequency.frequencyNumUnit == TimeServiceUnit.SEQUENCE)
                    it.key
                else
                    it.key.truncatedTo(timeServiceUnit)
            }
            .fold({ k, t -> GroupNode(k, timeServiceUnit, null, mutableListOf(t)) }) { _, r, t ->
                r.child?.add(t)
                r
            }.filter { it.value.child?.let { child -> child.size >= frequency.frequencyNum } ?: false }
    }
```



## HealthPlanRule
```markdown
package com.bjknrt.medication.remind.vo

import com.bjknrt.framework.api.vo.Id
import com.fasterxml.jackson.annotation.JsonProperty
import java.math.BigInteger
import java.time.Duration
import java.time.temporal.ChronoUnit
import java.time.temporal.Temporal
import java.time.temporal.TemporalUnit

data class HealthPlanRule(

    val id: Id,

    val frequencyTime: kotlin.Int,

    val frequencyTimeUnit: TimeServiceUnit,

    val frequencyNum: kotlin.Int,

    val frequencyNumUnit: TimeServiceUnit,

    var children: HealthPlanRule? = null
) {

    companion object {
        val EMPTY = HealthPlanRule(BigInteger.ZERO, 0, TimeServiceUnit.DAYS, 0, TimeServiceUnit.DAYS)
    }

}


/**
 * Java的ChronoUnit类纳秒到十年,加次
 * Values: NANOS,MICROS,MILLIS,SECONDS,MINUTES,HOURS,HALF_DAYS,DAYS,WEEKS,MONTHS,YEARS,DECADES,SEQUENCE
 */
enum class TimeServiceUnit(
    val value: kotlin.String, private val _duration: Duration
) : TemporalUnit {

    /**
     * 纳秒
     */
    @JsonProperty("NANOS")
    NANOS("NANOS", ChronoUnit.NANOS.duration),

    /**
     * 微秒
     */
    @JsonProperty("MICROS")
    MICROS("MICROS", ChronoUnit.MICROS.duration),

    /**
     * 毫秒
     */
    @JsonProperty("MILLIS")
    MILLIS("MILLIS", ChronoUnit.MILLIS.duration),

    /**
     * 秒
     */
    @JsonProperty("SECONDS")
    SECONDS("SECONDS", ChronoUnit.SECONDS.duration),

    /**
     * 分钟
     */
    @JsonProperty("MINUTES")
    MINUTES("MINUTES", ChronoUnit.MINUTES.duration),

    /**
     * 小时
     */
    @JsonProperty("HOURS")
    HOURS("HOURS", ChronoUnit.HOURS.duration),

    /**
     * 半天
     */
    @JsonProperty("HALF_DAYS")
    HALF_DAYS("HALF_DAYS", ChronoUnit.HALF_DAYS.duration),

    /**
     * 天
     */
    @JsonProperty("DAYS")
    DAYS("DAYS", ChronoUnit.DAYS.duration),

    /**
     * 周
     */
    @JsonProperty("WEEKS")
    WEEKS("WEEKS", ChronoUnit.WEEKS.duration),

    /**
     * 月
     */
    @JsonProperty("MONTHS")
    MONTHS("MONTHS", ChronoUnit.MONTHS.duration),

    /**
     * 年
     */
    @JsonProperty("YEARS")
    YEARS("YEARS", ChronoUnit.YEARS.duration),

    /**
     * 十年
     */
    @JsonProperty("DECADES")
    DECADES("DECADES", ChronoUnit.DECADES.duration),

    /**
     * 次
     */
    @JsonProperty("SEQUENCE")
    SEQUENCE("SEQUENCE", Duration.ofNanos(1)),

    /**
     * 永远
     */
    @JsonProperty("FOREVER")
    FOREVER("FOREVER", ChronoUnit.FOREVER.duration);


    override fun getDuration(): Duration {
        return _duration
    }

    override fun isDurationEstimated(): Boolean {
        return this >= DAYS
    }

    override fun isDateBased(): Boolean {
        return this >= DAYS && this != FOREVER
    }

    override fun isTimeBased(): Boolean {
        return this < DAYS
    }

    override fun <R : Temporal> addTo(temporal: R, amount: Long): R {
        if (this == SEQUENCE) {
            return temporal
        }
        return temporal.plus(amount, ChronoUnit.valueOf(this.name)) as R
    }

    override fun between(temporal1Inclusive: Temporal, temporal2Exclusive: Temporal): Long {
        if (this == SEQUENCE) {
            return 0
        }
        return temporal1Inclusive.until(temporal2Exclusive, ChronoUnit.valueOf(this.name))
    }

    override fun toString(): String {
        return name
    }


}
```

```
println("---------------------------------------------以下是周时间开始---------------------------------------------")
val timeNum = 3;
val timeUnit = TimeServiceUnit.WEEKS.value
val startTime = LocalDate.now().minusDays(26).atStartOfDay()

val timeObj = healthPlanService.calculationCycle(
    timeNum,
    ChronoUnit.valueOf(timeUnit),
    startTime
)
println(timeObj)

println("---------------------------------------------以下是周时间结束---------------------------------------------")
println("---------------------------------------------以下是日时间开始---------------------------------------------")
val timeObj4 = healthPlanService.calculationCycle(
4,
ChronoUnit.valueOf(TimeServiceUnit.DAYS.value),
startTime
)
println(timeObj4)
println("---------------------------------------------以下是日时间结束---------------------------------------------")
```