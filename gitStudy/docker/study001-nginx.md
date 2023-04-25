# Nginx Web 容器实战
1. 基于 Docker 虚拟化平台, 创建 nginx web 容器, 要求 Nginx 容器中只包含 Nginx 相关的软件, 数据.
2. 启动 Nginx 服务, 对外监听 80 端口.
3. 用户通过浏览器可以实现测试页面的访问
## 实战
1. 在 Docker 官方仓库中搜索Nginx镜像, 镜像文件中只包含 Nginx 相关的软件,数据, 操作的方法和指令如下:
```
docker search nginx
```

hello word

### 运行项目
> 可在命令行运行项目  比如配置为dev 
```
npm run dev
```