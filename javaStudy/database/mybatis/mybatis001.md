# mybatis
> 关于Mapper映射文件存放的位置的写法有以下两种
- * 将mapper接口和Mapper映射文件存放到 src/main/java 同一目录下
- 还需要在pom文件中手动指定资源文件夹路径resources
- * 将 Mapper接口和Mapper映射文件分开存放
- Mapper 接口类存放到src/main/java 目录下
- Mapper 映射文件存放到 resources(类路径)
- 在springBoot核心配置文件(Application)中指定mapper映射文件存放到位置