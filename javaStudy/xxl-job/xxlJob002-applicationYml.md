## 配置xxlJob
```yaml
server:
  port: 8080
spring:
  application:
    name: @moduleName@
  mvc:
    servlet:
      load-on-startup: 1
  profiles:
    active: ${APP_PROFILE:local}
  cloud:
    nacos:
      config:
        enabled: false
      discovery:
        enabled: false
#  data.redis.host: 192.168.3.150
#  data.redis.port: 6379
#  data.redis.database: 0
#  data.redis.username: default
#  data.redis.password: 1234qwer
  data.redis.host: localhost
  data.redis.port: 6379
# XXL-JOB
app:
  job:
    address: ${XXL_JOB_ADDR:} # 客户端job调用地址，不填根据ip和port生成
    app-name: @moduleName@
#     ip: ${SERVICE_DNS:} # 客户端ip，不填自动获取
    port: 9999

# 定时job
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

---
# 开发环境配置
spring:
  cloud:
    discovery:
      client:
        simple:
          instances:
            xxl-job-admin:
              - uri: ${app.job.server-address}
  config:
    activate:
      on-profile:
        - local
    import:
      - optional:classpath:/application-local.yml
  devtools:
    remote:
      restart:
        enabled: true
    livereload:
      enabled: true
    add-properties: true
  dgp:
    enabled: false

app:
  job:
    app-name: @moduleName@
    port: 9999
    server-address: "http://192.168.3.185:31005"
    access-token: "default_token_dev"

---
# 测试，生产
server:
  port: 8080
spring:
  application:
    name: @moduleName@
  mvc:
    servlet:
      load-on-startup: 1
  cloud:
    nacos:
      server-addr: ${NACOS_SERVER_ADDR:192.168.3.140:8848}
      config:
        enabled: true
        namespace: ${spring.profiles.active} # 命名空间：根据微服务分配，或者数据中心分配
      discovery:
        enabled: true
        namespace: ${spring.profiles.active}
        ip: ${SERVICE_DNS:}
    inetutils:
      preferred-networks:
        - 10.4 # k8s-cluster
        - 192.168 # local-net
  config:
    activate:
      on-profile:
        - dev
        - test
        - stage
        - prod
    import:
      - optional:nacos:${spring.application.name}-${spring.profiles.active}.yaml
      - optional:nacos:security-jwt-config-${spring.profiles.active}.yaml
      - optional:nacos:xxl-job-${spring.profiles.active}.yaml
      - optional:nacos:custom-config-${spring.profiles.active}.yaml
  devtools:
    remote:
      restart:
        enabled: false
    livereload:
      enabled: false
    add-properties: false
```