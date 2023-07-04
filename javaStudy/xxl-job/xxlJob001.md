# xxlJob
### 引入
```
implementation("com.bjknrt:xxl-job-spring-boot-starter:${property("xxlJobStarterVer")}")
```
#### xxlJob版本号
```
xxlJobStarterVer=2.3.1.6-SNAPSHOT
```

### 配置文件`application.yml`
```yaml
# XXL-JOB
app:
  job:
    address: ${XXL_JOB_ADDR:} # 客户端job调用地址，不填根据ip和port生成
    app-name: @moduleName@
#     ip: ${SERVICE_DNS:} # 客户端ip，不填自动获取
    port: 9999

# 开发环境配置
spring:
  cloud:
    discovery:
      client:
        simple:
          instances:
            xxl-job-admin:
              - uri: ${app.job.server-address}
              
# 测试，生产
server:
  port: 8080
spring:
  config:
    import:
      - optional:nacos:xxl-job-${spring.profiles.active}.yaml
```

### 启动文件`application`中引入
- EnableXxlJob

```

package com.bjknrt.dtx.demo

import com.bjknrt.xxljob.EnableXxlJob
import me.danwi.kato.client.ImportKatoClients
import me.danwi.kato.server.EnableKatoServer
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient

@EnableKatoServer
@ImportKatoClients(basePackages = ["com.bjknrt.dtx"])
@EnableDiscoveryClient
@EnableXxlJob
@SpringBootApplication(scanBasePackages = ["com.bjknrt.common", "com.bjknrt.dtx"])
class DemoApplication

fun main(args: Array<String>) {
    runApplication<DemoApplication>(*args)
}
```

### XxlJobTestConfig
```
package com.bjknrt.dtx.demo

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

###  xxlJob示例代码
- 创建class SampleXxlJob
```
package com.bjknrt.dtx.demo.job

import com.bjknrt.common.log.LOGGER
import com.xxl.job.core.context.XxlJobHelper
import com.xxl.job.core.handler.annotation.XxlJob
import me.danwi.kato.common.exception.KatoBusinessCodeException
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component

@Component
class SampleXxlJob {

    @XxlJob("demoJobHandler", init = "init", destroy = "destroy")
    fun demoJobHandler() {
        XxlJobHelper.log("XXL-JOB, Hello World.")
        LOGGER.info("start job")
        val jobParam = XxlJobHelper.getJobParam()
        val jobId = XxlJobHelper.getJobId()
        LOGGER.info("APP jobId:{},jobParam:{}", jobId, jobParam)
        XxlJobHelper.log("XXL jobId:{},jobParam:{}", jobId, jobParam)
        if (jobParam == "error") {
            throw KatoBusinessCodeException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "测试异常")
        }

        if (jobParam?.toIntOrNull() != null) {
            XxlJobHelper.handleResult(jobParam.toInt(), "测试状态码结果")
            return
        }

        if (jobParam == "fail") {
            XxlJobHelper.handleFail("测试失败")
        } else {
            XxlJobHelper.handleSuccess("测试成功:${jobParam}")
        }
    }

    fun init() {
        LOGGER.info("init")
        XxlJobHelper.log("XXL-JOB, init.")
    }

    fun destroy() {
        LOGGER.info("destroy")
        XxlJobHelper.log("XXL-JOB,destroy.")
    }
}
```