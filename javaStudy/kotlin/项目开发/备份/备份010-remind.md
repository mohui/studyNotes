
### 配置文件
```yaml
// xxl-job
implementation("com.bjknrt:xxl-job-spring-boot-starter")
```

#### application.yml

```yaml
spring:
  config:
    import:
      - optional:nacos:xxl-job-${spring.profiles.active}.yaml
app:
  job:
    app-name: @moduleName@
    port: 9999
    server-address: "http://192.168.3.205:7999/xxl-job-admin"
    access-token: "default_token"
```
```
package com.bjknrt.medication.remind

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

### remind业务代码
```
package com.bjknrt.medication.remind.job

import com.bjknrt.framework.api.vo.PagedResult
import com.bjknrt.medication.remind.service.HealthPlanService
import com.bjknrt.medication.remind.util.PageUtils
import com.xxl.job.core.handler.annotation.XxlJob
import me.danwi.sqlex.core.query.*
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class NoticeJob(val noticeService: NoticeService, val healthPlanService: HealthPlanService) {

    @Value("\${app.page.default.pageSize:5000}")
    var pageSize = 5000L

    /**
     * 每分钟
     */
    @XxlJob("remind")
    fun exec() {
        PageUtils.pageExec(
            { currentPage -> PagedResult.fromDbPaged(healthPlanService.pagePatientIds(currentPage, pageSize)) },
            { patientIds -> noticeService.remind(patientIds) }
        )
    }

    /**
     * 线下随访开始时间提醒
     */
    @XxlJob("offlineVisitStartDate")
    fun offlineVisitStartDate() {
        PageUtils.pageExec(
            { currentPage -> PagedResult.fromDbPaged(healthPlanService.pagePatientIds(currentPage, pageSize)) },
            { patientIds -> noticeService.offlineVisitStartDate(patientIds) }
        )
    }

    /**
     * 线下随访结束时间提醒
     */
    @XxlJob("offlineVisitEndDate")
    fun offlineVisitEndDate() {
        PageUtils.pageExec(
            { currentPage -> PagedResult.fromDbPaged(healthPlanService.pagePatientIds(currentPage, pageSize)) },
            { patientIds -> noticeService.offlineVisitEndDate(patientIds) }
        )
    }

    /**
     * 测量计划（血压、空腹血糖、餐前血糖、餐后2小时血糖、脉搏氧饱和度）
     */
    @XxlJob("measure")
    fun measure() {
        PageUtils.pageExec(
            { currentPage -> PagedResult.fromDbPaged(healthPlanService.pagePatientIds(currentPage, pageSize)) },
            { patientIds -> noticeService.measure(patientIds) }
        )
    }

    @XxlJob("onlineVisitStartDate")
    fun onlineVisitStartDate() {
        PageUtils.pageExec(
            { currentPage -> PagedResult.fromDbPaged(healthPlanService.pagePatientIds(currentPage, pageSize)) },
            { patientIds -> noticeService.onlineVisitStartDate(patientIds) }
        )
    }
}

```

### 单元测试

```
package com.bjknrt.medication.remind

import com.bjknrt.xxljob.client.rpc.JobGroupApi
import com.bjknrt.xxljob.client.rpc.model.XxlJobGroup
import com.xxl.job.core.biz.model.ReturnT
import org.mockito.Mockito
import org.springframework.beans.factory.InitializingBean
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.boot.test.mock.mockito.MockReset

@TestConfiguration
class XxlJobTestConfig : InitializingBean {

    @MockBean(reset = MockReset.NONE)
    lateinit var jobGroupApi: JobGroupApi

    override fun afterPropertiesSet() {
        //通过服务名查询执行器的模拟
        Mockito.`when`(jobGroupApi.loadByAppName(Mockito.anyString()))
            .thenReturn(
                ReturnT(
                    XxlJobGroup().apply {
                        id = 1
                        appname = "MOCK"
                    }
                )
            )
    }

}
```