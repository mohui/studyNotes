## 1. 建module
File -> New -> Module... -> Maven
## 2. 改POM
- 看主项目的 pom.xml, 会看到 多了 modules
```html
<version>1.0-SNAPSHOT</version>
<modules>
    <module>子项目名称</module>
</modules>
<packaging>pom</packaging>
```
下移改为
```html
<version>1.0-SNAPSHOT</version>
<packaging>pom</packaging>

<modules>
    <module>子项目名称</module>
</modules>
```
## 3. 写YML
- 在 resources 下新建 application.yml
```yaml
server:
  port: 8080
spring:
  devtools:
    add-properties: false
  application:
    name: @projectName@ #服务名称: remind-service
  datasource:
    driver-class-name: com.p6spy.engine.spy.P6SpyDriver
    url: jdbc:p6spy:mysql://localhost:3306/medication_remind?connectionTimeZone=SERVER&characterEncoding=utf8
    username: root
    password: 1234qwer
  profiles:
    active: dev-local
  cloud:
    nacos:
      server-addr: 192.168.3.140:8848
      config:
        enabled: true
        namespace: ${spring.profiles.active} # 命名空间：根据微服务分配，或者数据中心分配
      discovery:
        enabled: true
        namespace: ${spring.profiles.active}
  config:
    import:
      - optional:nacos:${spring.application.name}-${spring.profiles.active}.yaml
      - optional:nacos:security-jwt-config-${spring.profiles.active}.yaml
      - optional:nacos:xxl-job-${spring.profiles.active}.yaml
app:
  job:
    app-name: @projectName@
    port: 9999
    server-address: "http://192.168.3.205:7999/xxl-job-admin"
    access-token: "default_token"

logging:
  file:
    name: logs/${spring.application.name}/app.log

---
# 开发环境配置
spring:
  dgp:
    enabled: false
  config:
    activate:
      on-profile:
        - dev-local
    import:
      - optional:classpath:/application-dev-local.yml

---
# 测试，生产
spring:
  config:
    activate:
      on-profile:
        - test
        - pro
    import:
      - optional:nacos:${spring.application.name}-other-config-${spring.profiles.active}.yaml

#spring:
#  config:
#    import:
#      - optional:nacos:test.yml  # 监听 DEFAULT_GROUP:test.yml
#      - optional:nacos:test01.yml?group=group_01 # 覆盖默认 group，监听 group_01:test01.yml
#      - optional:nacos:test02.yml?group=group_02&refreshEnabled=false # 不开启动态刷新
#      - nacos:test03.yml # 在拉取nacos配置异常时会快速失败，会导致 spring 容器启动失败
```
## 4. 主启动
## 5. 业务类