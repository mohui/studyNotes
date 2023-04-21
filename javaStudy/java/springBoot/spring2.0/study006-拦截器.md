### 拦截器配置文件
- addInterceptors: 配置拦截器重写方法
- addPathPatterns(): 要拦截的方法
- excludePathPatterns(): 不拦截的方法
- "/user/**": user下的所有方法都拦截, 
- 两个 **: 代表多层,比如 /user/get/id 拦截, 一个 * 仅代表/user下一层
```
package com.xzmh.springboot.config;

import com.xzmh.springboot.interceptor.UserInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // 定义此类为配置文件
public class InterceptorConfig implements WebMvcConfigurer {
    /**
     * addInterceptor(里添加定义的拦截器)
     * .addPathPatterns(要拦截的路径)
     * .excludePathPatterns(要排除的路径)
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 要拦截的路径
        String[] addPathPattens = {
                "/user/**"
        };
        // 要排除的路径
        String[] excludePathPatterns = {
                "/user/out", "/user/error", "/user/login"
        };

        // 里面放的是你定义的拦截器
        registry.addInterceptor(new UserInterceptor()).addPathPatterns(addPathPattens).excludePathPatterns(excludePathPatterns);
    }
}
```

### HandlerInterceptor 重写方法
- 从session中读取用户信息
- request.getSession().getAttribute("user");
```
package com.xzmh.springboot.interceptor;

import com.xzmh.springboot.model.User;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * mac Ctrl + i 生成重写方法
 */
public class UserInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // 从session中取出user
        User user = (User) request.getSession().getAttribute("user");
        // 如果没有取出来, 代表没有登录
        if (user == null) {
            // 如果没有登录, 调到一个error页面
            response.sendRedirect(request.getContextPath() + "/user/error");
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
```
### 自定义的model
- 放到session中的用户信息model
```
package com.xzmh.springboot.model;

public class User {
    private Integer id;
    private String username;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
```