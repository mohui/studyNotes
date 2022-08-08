## 配置项目
1. 创建表
xxl-job -> doc -> db -> tables_xxl_job.sql
穿管
2. 修改数据库配置
xxl-job -> xxl-job-admin -> src -> main -> resources -> application.propertiess(文件)
- 数据库配置
```
// 改为自己的数据库路径
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/xxl_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai
// 改为自己的数据库账号
spring.datasource.username=root
// 改为自己的数据库密码
spring.datasource.password=1234qwer
```
- 改通信令牌
```markdown
xxl.job.accessToken= bjknrt
```
3. 修改路径(mac需要)
- xxl-job -> xxl-job-admin -> src -> main -> resources -> logback.xml(文件)
- 苹果电脑是绝对路径, 需要改日志文件路径
```
// 改为自己的路径
<property name="log.path" value="/Users/wanghehui/projects/java/xxl-job/xxl-job-admin.log"/>
```
4. 路径,账号,密码
http://localhost:8081/xxl-job-admin
user: admin
password: 123456
## 启动项目
1. 执行器管理
2. 新增执行器
```markdown
AppName* -> medication-remind
名称* -> 定时提醒用药
注册方式* -> 默认自动注测
机器地址* -> 没有填
```
3. 任务管理
4. 新增任务
```markdown
执行器* -> 定时提醒用药
任务描述* -> 随便填 比如: 定时用药
负责人* -> 王贺辉
报警邮件* -> 没有填

// 调度配置
调度类型* -> 默认 CRON
Cron* -> 可以选,默认定时时间 cron 表达式

// 任务配置
运行模式* -> 默认 BEAN
JobHandler* ->

```
5. 应用
```markdown

    // xxl-job
    implementation("com.xuxueli:xxl-job-executor-samples:2.3.1")
```