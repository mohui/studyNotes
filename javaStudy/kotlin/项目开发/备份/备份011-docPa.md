###
```yaml
// xxl-job
implementation("com.bjknrt:xxl-job-spring-boot-starter")
```

### 配置文件
```yaml
spring:
  config:
      - optional:nacos:xxl-job-${spring.profiles.active}.yaml

app:
  job:
    app-name: @moduleName@
    port: 9999
    server-address: "http://192.168.3.205:7999/xxl-job-admin"
    access-token: "default_token"
```
### test
```markdown
package com.bjknrt.doctor.patient.management

import com.bjknrt.framework.util.AppSpringUtil
import com.xxl.job.core.executor.XxlJobExecutor
import org.junit.jupiter.api.AfterAll
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Import
import org.springframework.transaction.annotation.Transactional

// https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing
// https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html#testing-introduction
// https://www.testcontainers.org/quickstart/junit_5_quickstart/ https://spring.io/guides/gs/testing-web/
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Import(ConfigTest::class)
@Transactional
abstract class AbstractContainerBaseTest {

    companion object {
        @AfterAll
        @JvmStatic
        fun afterAll() {
            AppSpringUtil.getBean(XxlJobExecutor::class.java).destroy()
        }
    }

}
```


### 业务代码
```
package com.bjknrt.doctor.patient.management.job

import com.bjknrt.doctor.patient.management.dao.ForeignOperationLogDAO
import com.bjknrt.doctor.patient.management.service.PatientService
import com.bjknrt.operation.log.vo.LogAction
import com.bjknrt.operation.log.vo.LogModule
import com.xxl.job.core.context.XxlJobHelper
import com.xxl.job.core.handler.annotation.XxlJob
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import java.util.*

/**
 * @Description: 更新患者7天内未登录状态的定时任务
 */
@Component
class PatientLoginStatusJob(
    val foreignOperationLogDAO: ForeignOperationLogDAO,
    val patientService: PatientService
) {
    companion object {

        //job名称
        const val NOT_LOGGED_FOR_SEVEN_DAYS_JOB_NAME = "notLoggedForSevenDaysJobHandler"

        //未登录天数
        const val NOT_LOGIN_DAYS_NUM = 7

        //日活
        val LOG_MODULE_MAP = mapOf(
            LogModule.PATIENT_CLIENT to "患者端服务"
        )
        val LOG_ACTION_MAP = mapOf(
            LogAction.PATIENT_CLIENT_DAILY_ACTIVE_USER to "记录日活"
        )
    }

    @XxlJob(NOT_LOGGED_FOR_SEVEN_DAYS_JOB_NAME)
    @Transactional
    fun notLoggedForSevenDaysJobHandler() {
        XxlJobHelper.log("start exec notLoggedForSevenDaysJobHandler.....")
        //1、查询7天内活跃的所有患者
        val patientIdsList =
            foreignOperationLogDAO.findSevenDayActivePatientIdsList(
                NOT_LOGIN_DAYS_NUM,
                LOG_MODULE_MAP[LogModule.PATIENT_CLIENT],
                LOG_ACTION_MAP[LogAction.PATIENT_CLIENT_DAILY_ACTIVE_USER]
            )
        //2、更新患者的待办事项状态的接口
        patientService.updateSevenDaysNotLogin(patientIdsList)
    }
}
```


## ConfigTest
```markdown
package com.bjknrt.doctor.patient.management

import com.bjknrt.framework.test.DbTestConfig
import com.zaxxer.hikari.HikariDataSource
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Import
import javax.sql.DataSource

@Import(value = [XxlJobTestConfig::class, DbTestConfig::class])
class ConfigTest{
    @Bean
    fun foreignDataSourceConfigProperties(
        dataSource: DataSource
    ): ForeignDataSourceConfigProperties {
        val hikariDataSource = dataSource as HikariDataSource
        val dbName = hikariDataSource.jdbcUrl.substringAfterLast("/")
        return ForeignDataSourceConfigProperties(
            foreign = mapOf(
                "upcs" to dbName,
                "hs" to dbName
            )
        )
    }
}

```