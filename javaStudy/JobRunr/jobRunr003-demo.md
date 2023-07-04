```
package com.bjknrt.dtx.demo.job

import jakarta.annotation.PostConstruct
import org.jobrunr.jobs.JobId
import org.jobrunr.jobs.annotations.Job
import org.jobrunr.jobs.states.StateName
import org.jobrunr.scheduling.JobScheduler
import org.jobrunr.spring.annotations.Recurring
import org.jobrunr.storage.StorageProvider
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class TestDbJobRunr {

    @Autowired
    private lateinit var jobScheduler: JobScheduler

    /**
     * cron: 秒 分 时 日 月 周 年
     */

    @PostConstruct
    fun scheduleTestJob() {

        val cronExpression4 = "21 16 30 * *"
        val id = jobScheduler.scheduleRecurrently(cronExpression4, ::testJob5)
        println("看看是啥$id")
    }

    @Recurring(id = "test_exec_1", interval = "PT1M")
    @Job(retries = 3)
    fun testJob1() {
        println("测试一下JobRunr调用!")
        // 在这里编写要定期执行的任务逻辑
        // 调用您的测试接口
    }

    @Recurring(id = "ten_exec_2", cron = "0 10 1 * *")
    @Job(retries = 3)
    fun testJob2() {
        println("每月1号10点执行任务")
        // 在这里编写要定期执行的任务逻辑
    }

    /**
     * cron: 秒 分 时 日 月 周 年
     *        0 24 12 3 * * *
     */
    @Recurring(id = "ten_exec_3", cron = "0 24 12 3 * *")
    @Job(retries = 3)
    fun testJob3() {
        println("每月几号几点几分执行任务1")
        // 在这里编写要定期执行的任务逻辑
    }

    @Job(name = "ten_exec_4", retries = 3)
    fun testJob4() {
        println("执行指定日期时间的任务")
        // 在这里编写要定期执行的任务逻辑
    }

    @Job(name = "ten_exec_5", retries = 3)
    fun testJob5() {

        println("延迟五秒执行的任务")
        // 在这里编写要延迟执行的任务逻辑
    }
}
```