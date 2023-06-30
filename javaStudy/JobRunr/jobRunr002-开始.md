# jobRunr应用
- 基于kotlin环境
- springBoot3.0+版本
- [官网](https://www.jobrunr.io/en/)

## 1. 配置文件引入插件
- [查看jobRunr版本](https://central.sonatype.com/artifact/org.jobrunr/jobrunr-spring-boot-3-starter/6.2.3/versions)
```yaml
// 引入定时job+异步job jobRunrVer=6.2.3
implementation("org.jobrunr:jobrunr-spring-boot-3-starter:${property("jobRunrVer")}")

// redis
implementation("org.apache.commons:commons-pool2")
implementation("org.springframework.boot:spring-boot-starter-data-redis")
```

## 2. application.ynl 文件中写入配置
```yaml
spring:
  data.redis.host: localhost
  data.redis.port: 6379
  data.redis.database: 0
  data.redis.username: user
  data.redis.password: secret

# 定时job 详情解释在 `001` 中
org.jobrunr.database.skip-create: false
org.jobrunr.database.table-prefix: jobrunr-${spring.application.name}-${spring.profiles.active} # allows to set a table prefix (e.g. schema  or schema and tableprefix for all tables. e.g. MYSCHEMA._jobrunr)
#org.jobrunr.database.database-name: jobrunr # Override the default database name to use (e.g. use main application database)
#org.jobrunr.database.datasource :  # allows to specify a DataSource specifically for JobRunr
org.jobrunr.database.type: redis-lettuce # if you have multiple supported storage providers available in your application (e.g. an SQL DataSource and Elasticsearch), it allows to specify which database to choose. Valid values are 'sql', 'mongodb', 'redis-lettuce', 'redis-jedis' and 'elasticsearch'.
org.jobrunr.jobs.default-number-of-retries: 5 #the default number of retries for a failing job
org.jobrunr.jobs.retry-back-off-time-seed: 3 #the default time seed for the exponential back-off policy.
org.jobrunr.job-scheduler.enabled: true
org.jobrunr.background-job-server.enabled: true
#org.jobrunr.background-job-server.worker-count:  #this value normally is defined by the amount of CPU's that are available
org.jobrunr.background-job-server.poll-interval-in-seconds: 5 #check for new work every 15 seconds
org.jobrunr.background-job-server.delete-succeeded-jobs-after: 336 #succeeded jobs will go to the deleted state after 36 hours
org.jobrunr.background-job-server.permanently-delete-deleted-jobs-after: 672 #deleted jobs will be deleted permanently after 72 hours
org.jobrunr.background-job-server.metrics.enabled: false #Micrometer integration - this was true in v5.
org.jobrunr.dashboard.enabled: true
org.jobrunr.dashboard.port: 8000 #the port on which to start the dashboard
```

## 3. 添加配置文件
```
package com.bjknrt.dtx.demo

import io.lettuce.core.RedisClient
import org.jobrunr.jobs.mappers.JobMapper
import org.jobrunr.spring.autoconfigure.JobRunrProperties
import org.jobrunr.storage.InMemoryStorageProvider
import org.jobrunr.storage.StorageProvider
import org.jobrunr.storage.nosql.redis.LettuceRedisStorageProvider
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory

@Configuration
class JobRunnrConfig {
    // 创建一个内存存储提供程序的对象。该函数接受一个 JobMapper 参数，并返回一个 StorageProvider 对象。
    fun inMemoryStorageProvider(jobMapper: JobMapper): StorageProvider {
        return InMemoryStorageProvider().apply {
            setJobMapper(jobMapper)
        }
    }

    /**
     * 创建一个 Redis 存储提供程序的 Bean
     */
    @Bean(name = ["storageProvider"], destroyMethod = "close")
    @ConditionalOnMissingBean
    fun redisStorageProvider(
        lettuceConnectionFactory: LettuceConnectionFactory,
        jobMapper: JobMapper,
        properties: JobRunrProperties
    ): StorageProvider {
        val lettuceRedisStorageProvider = LettuceRedisStorageProvider(
            lettuceConnectionFactory.requiredNativeClient as RedisClient,
            properties.database.tablePrefix
        )
        lettuceRedisStorageProvider.setJobMapper(jobMapper)
        return lettuceRedisStorageProvider
    }
}
```