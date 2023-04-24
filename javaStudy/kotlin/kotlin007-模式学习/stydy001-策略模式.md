# 策略工厂模式笔记

## 新建一个文件夹,实现此工厂
```html
factory
```
## 创建一个处理文件,相当于此工厂能做些什么
- 首字母大写
- interface 接口文件
- StudyHandler
```
package com.bjknrt.kotlin.data.factory

interface StudyHandler {
    /**
     * 获取科目
     */
    fun getSubjectDetail(subject: String)

    /**
     * 排序
     */
    fun getOrder(): Int
}
```

## 创建impl文件夹, 放具体的视线实现
- impl
### impl 文件夹下放具体实现
- 特别注意: 文件夹实现可以是多种, 例如:各个学科
```
ChineseHandler: 语文学科
MathematicsHandler: 数学学科
```
- 文件首字母大写
- class 文件
- 加注解 @Component
- 继承父文件 :StudyHandler
- 实现父文件

```
package com.bjknrt.kotlin.data.factory.impl

import com.bjknrt.kotlin.data.factory.StudyHandler
import org.springframework.stereotype.Component

@Component
class ChineseHandler: StudyHandler {
    override fun getSubjectDetail(subject: String) {
        TODO("Not yet implemented")
    }
    
    override fun getSubject(subject: String): Boolean {
        TODO("Not yet implemented")
    }

    override fun getOrder(): Int {
        TODO("Not yet implemented")
    }
}
```
##### 对以上文件的一个示例实现
- 在工厂目录下创建一个枚举, 实际开发放到枚举目录下
```html
package com.bjknrt.kotlin.data.factory

import com.fasterxml.jackson.annotation.JsonProperty

enum class SubjectEnum(val value: kotlin.String) {

    /**
     * 语文
     */
    @JsonProperty("CHINESE") CHINESE("语文"),

    /**
     * 数学
     */
    @JsonProperty("MATHEMATICS") MATHEMATICS("数学"),

    /**
     * 英语
     */
    @JsonProperty("ENGLISH") ENGLISH("英语"),

    /**
     * java编程
     */
    @JsonProperty("JAVA") JAVA("java编程")
}
```
- 创建一个返回值类型
```
package com.bjknrt.kotlin.data.factory

import com.bjknrt.kotlin.data.vo.FrequencyNumUnit
import com.bjknrt.kotlin.data.vo.TimeUnit
import com.fasterxml.jackson.annotation.JsonProperty

data class SubjectResult (
    val id: java.math.BigInteger,

    @field:JsonProperty("name", required = true) val name: kotlin.String,
    
    val score: Int
) {
}
```
- 语文的具体实现
```
package com.bjknrt.kotlin.data.factory.impl

import com.bjknrt.kotlin.data.factory.StudyHandler
import com.bjknrt.kotlin.data.factory.SubjectEnum
import com.bjknrt.kotlin.data.factory.SubjectResult
import org.springframework.stereotype.Component
import java.math.BigInteger

@Component
class ChineseHandler: StudyHandler {
    companion object {
        const val ORDER = 1
    }

    override fun getSubjectDetail(subject: String): List<SubjectResult> {
        return listOf(
            SubjectResult(
                id = BigInteger.valueOf(1),
                name = "语文",
                score = 100
            )
        )
    }

    /**
     * 判断传过来的是否是语文
     */
    override fun getSubject(subject: String): Boolean {
        return SubjectEnum.valueOf(subject) == SubjectEnum.CHINESE
    }

    /**
     * 语文默认排序为1
     */
    override fun getOrder(): Int {
        return ORDER
    }
}
```

## 创建一个工厂文件
- 首字母大写
- class 文件
- StudyFactory
### 以下是各个实现后的样式
- 创建完成以后加注解 @Component
```
package com.bjknrt.kotlin.data.factory
import org.springframework.stereotype.Component

@Component
class StudyFactory {
}
```
- 注入实现 studyHandlerList: List<StudyHandler>
```
package com.bjknrt.kotlin.data.factory

import org.springframework.stereotype.Component

@Component
class StudyFactory(
    studyHandlerList: List<StudyHandler>
) {
}
```
- 终极实现
```
package com.bjknrt.kotlin.data.factory

import org.springframework.stereotype.Component

@Component
class StudyFactory(
    studyHandlerList: List<StudyHandler>
) {
    // 排序
    private val studyList = studyHandlerList.sortedByDescending { it.getOrder() }

    // 根据传过来的参数取出相应的科目
    private fun checkSubject(subject: String): StudyHandler? {
        return studyList.firstOrNull{ it.getSubject(subject) }
    }

    // 根据科目获取详情
    fun getSubject(subject: String): List<SubjectResult> {
        return this.checkSubject(subject)?.getSubjectDetail(subject)?: listOf()
    }
}
```