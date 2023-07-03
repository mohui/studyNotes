## 配置说明
`org.jobrunr.database.skip-create`：指定是否跳过创建数据库表。如果设置为false，
JobRunr将自动创建所需的数据库表。 默认值为false。

`org.jobrunr.database.table-prefix`：允许设置数据库表的前缀。可以使用前缀来指定数据库模式或表前缀。
例如，可以设置为MYSCHEMA._jobrunr。默认值为空。

`org.jobrunr.database.database-name`：用于覆盖默认的数据库名称。可以指定要使用的数据库名称，
以覆盖默认的数据库名称。默认值为jobrunr。

`org.jobrunr.database.datasource`：允许指定专门用于JobRunr的数据源。可以指定一个特定的数据源供JobRunr使用。

`org.jobrunr.database.type`：如果应用程序中有多个支持的存储提供程序（例如SQL数据源和Elasticsearch），
可以指定要选择的数据库。有效值为sql、mongodb、redis-lettuce、redis-jedis和elasticsearch。

`org.jobrunr.jobs.default-number-of-retries`：指定失败任务的默认重试次数。默认值为10。

`org.jobrunr.jobs.retry-back-off-time-seed`：指定指数回退策略的默认时间种子。默认值为3。

`org.jobrunr.job-scheduler.enabled`：指定是否启用作业调度器。如果设置为true，JobRunr将启用作业调度功能。默认值为true。

`org.jobrunr.background-job-server.enabled`：指定是否启用后台作业服务器。如果设置为true，
JobRunr将启动后台作业服务器，用于处理后台作业的执行。默认值为false。

`org.jobrunr.background-job-server.worker-count`：指定后台作业服务器的工作线程数。
通常，可以根据可用的CPU数量来设置工作线程数。

`org.jobrunr.background-job-server.poll-interval-in-seconds`：指定后台作业服务器检查新任务的时间间隔（以秒为单位）。
默认值为15秒。

`org.jobrunr.background-job-server.delete-succeeded-jobs-after`：指定成功的作业在多长时间后转为已删除状态
（ 以小时为单位）。默认值为36小时。

`org.jobrunr.background-job-server.permanently-delete-deleted-jobs-after`：指定已删除的作业在多长时间后永久删除
（以小时为单位）。默认值为72小时。

`org.jobrunr.background-job-server.metrics.enabled`：指定是否启用Micrometer集成的度量指标功能。默认值为false。

`org.jobrunr.dashboard.enabled`：指定是否启用JobRunr仪表板。如果设置为true，JobRunr将启用仪表板功能。默认值为false。

`org.jobrunr.dashboard.port`：指定启动仪表板的端口号。默认值为8000。

`org.jobrunr.miscellaneous.allow-anonymous-data-usage`：指定是否允许匿名数据使用。如果设置为true，
JobRunr将发送成功作业的数量用于营销目的。默认值为true。


var aTime = targetDateTime?: ZonedDateTime.of(2023, 7, 3, 16, 27, 0, 0, ZoneId.systemDefault())
