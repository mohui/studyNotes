# 项目

## 创建一个空项目
- 打开 IDE -> 点击 File -> 点击 New -> 选择 Project.. -> Empty Project
- Location 目录里不要带项目名称,否则会多一天文件夹
```
Name: 项目名称(hui-springboot)
Location: 项目地址(/Users/wanghehui/projects/xzmProjects/java)
```

## 创建model
- 需要网络, 需要翻墙, 否则会访问不了 https://start.spring.io/
- 点击 New -> 选择Module.. -> 选择 Spring Initializr 
- 以下的几个可以看着改 eg:
```
Name(会自动跟着 Artifact  改变): xzm-school
Location(不用改): ~/projects/xzmProjects/java/hui-springboot
Language: Java
Type(这个需要选Maven): Maven
Group: com.xzmh.springboot
Artifact: xzmh-school
Version(版本号): 1.0.0
JDK: 根据 Java 版本改, 低版本的适用不了高版本的 java
Java: 可以改, 太高的版本适用不了低版本的 jdk
package: 包名, 通常不能出现数字
```
### Dependencies 选择依赖
- spring Boot -> 2**
- web -> spring web