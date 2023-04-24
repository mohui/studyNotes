# HandlerInterceptor  拦截器
```yaml

```
## preHandle 目标方法执行之前

## postHandle 目标方法执行完成之后

## afterCompletion 页面渲染以后


#### addPathPatterns 要拦截的
- 所有请求都被拦截, 包括静态资源
```
.addPathPatterns("/**")
```
#### excludePathPatterns 放行请求
```
.excludePathPatterns("/", "/login", "/css/**", "/fonts/**", "/js/**")
```