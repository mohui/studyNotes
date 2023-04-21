# 代码实现
- https://www.bilibili.com/video/BV1rv411k7RD?p=7&vd_source=39f266c622d872c7f9fb6ec3d2ad3a60
- springBoot 项目代码必须放在 Application 类所在的 同级或者下级目录下

## application 启动文件
```
package com.xzmh.springboot.xzm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// springBoot 项目启动入口类
@SpringBootApplication // 开启 springBoot 配置
public class XzmApplication {
	// springBoot 项目代码必须放在 Application 类所在的 同级或者下级目录下

	public static void main(String[] args) {
		SpringApplication.run(XzmApplication.class, args);
	}

}
```

## 创建的第一个接口
- application 文件同级创建一个web文件夹,里面创建一个class  IndexController
- 访问路径: http://localhost:8080/web/say
```
package com.xzmh.springboot.xzm.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class IndexController {
    @RequestMapping(value = "/web/say")
    public @ResponseBody String say() {
        return "hello springBoot";
    }
}

```