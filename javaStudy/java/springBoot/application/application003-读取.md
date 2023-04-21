## 读取配置文件单个内容
- @Value("${title}")
- @value()注解, 用法: "${}"

### 配置文件
```properties
title=hello word
```
### controller读取
```controller
public class IndexController {
    @Value("${title}")
    private String title;
    
    public @ResponseBody String say() {
        return title;
    }
}
```
## 读取配置文件对象内容
- 在配置文件定义对象
- 创建config

### 配置文件内容
- 开头必须一样 eg: country.
```properties
country.name=China
country.city=Beijing
```
### config
- 创建一个类
- 加注解 @Component => 将此类给spring容器管理
- 加注解 @ConfigurationProperties => 里面的值是对象变量
```config
package com.xzmh.springboot.controller.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @ConfigurationProperties注解的prefix的值是配置文件的对象
 */
@Component// 将此类给spring容器管理
@ConfigurationProperties(prefix = "country")
public class Country {
    private String name;
    private String city;

    /**
     * Command + N -> 选 Getter and Setter
     */
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
```
### 控制器读取
```controller
public class IndexController {
    @Autowired
    private Country country;
    
    @RequestMapping(value = "/getConfig")
    public @ResponseBody Map<String, Object> getConfig() {
        Map<String, Object> retMap = new HashMap<>();
        retMap.put("message", country.getName());
        retMap.put("test",  country.getCity());
        return retMap;
    }
}
```