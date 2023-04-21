# application.properties 核心配置文件
- http://localhost:8080/mapValue

## 代码实现
```
package com.xzmh.springboot.xzm.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class IndexController {
    @RequestMapping(value = "/web/say")
    public @ResponseBody String say() {
        return "hello springBoot";
    }

    @RequestMapping(value="mapValue")
    @ResponseBody
    public Map<String, Object> mapValue() {
        Map<String, Object> retMap = new HashMap<String, Object>();
        retMap.put("code", "你好啊");
        return retMap;
    }
}
```

## application.properties 核心配置文件
- 在 application.properties 做以下修改
- server.port = 修改默认端口
- server.servlet.context-path= 要以 / 开头, 后面跟什么,访问端口需要加什么
- eg:
```markdown
# 设置内嵌Tomcat端口号 上面的访问就要改为 http://localhost:8088/mapValue
server.port=8088

# 设置上线文根 上面的访问就要改为 http://localhost:8088/whh/mapValue
server.servlet.context-path=/whh

```