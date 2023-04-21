# pom 文件描述
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <!-- SpringBoot 父工程GAV -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.3</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <!-- 当前项目GAV -->
    <groupId>com.xzmh.springboot</groupId>
    <artifactId>xzm</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <name>xzm</name>
    <description>xzm</description>

    <!-- 编译级别-->
    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <!-- SpringBoot 框架 web 项目起步依赖  -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!--	SpringBoot 框架测试起步依赖	-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- SpringBoot 项目打包编译的插件 -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```