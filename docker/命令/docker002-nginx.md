# docker中 nginx

### 暴露外部端口
> 然后你可以在您的浏览器中点击 http://localhost:8080
```
$ docker run -d --name some-nginx -p 8080:80 nginx
```

### 复制
- `docker cp`：复制命令。 
- `tmp-nginx`：容器的名称 或 ID。
- `:/etc/nginx`：容器内的源文件或目录路径。 
- `/Users/yangqingxian/Desktop/docker/nginx`：主机上的目标文件或目录路径。
```
docker cp tmp-nginx:/etc/nginx /Users/yangqingxian/Desktop/docker/nginx
```
> docker cp 命令用于在 Docker 容器和主机之间复制文件或目录。
> 在示例中，希望将容器内的 `/etc/nginx` 目录 
> 复制到主机上的 `/Users/yangqingxian/Desktop/docker/nginx` 目录。

# 一些示例
```
# `worker_processes auto;`：指定 Nginx 的工作进程数。auto 表示根据 CPU 核心数自动设置进程数。
worker_processes auto;
# `events`：配置 Nginx 事件模块的参数。
# `worker_connections` 指定每个工作进程的最大连接数。
events {
    worker_connections 1024;
}

http {
    # 包含一个文件，该文件定义了 MIME 类型与文件扩展名之间的映射关系。
    include mime.types;
    # 指定默认的 MIME 类型，当无法确定文件类型时使用。
    default_type application/octet-stream;
    # 启用 sendfile 指令，加快静态文件的传输速度。
    sendfile on;
    # 设置 HTTP 连接的超时时间。
    keepalive_timeout 65;

    server {
        # 监听的端口号
        listen 80;
        # 定义服务器的域名或 IP 地址。
        server_name localhost;
        # 指定服务器的根目录。
        root /var/www/html;
        # 定义索引文件的顺序，当访问一个目录时，服务器会尝试按照指定的顺序返回第一个存在的文件。
        index index.php index.html;

        # 处理根路径 / 的请求
        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }
        # 处理以 .php 结尾的请求。
        location ~ \.php$ {
            # 指定将请求转发给 PHP-FPM（FastCGI 进程管理器）处理的地址和端口。
            fastcgi_pass php-fpm:9000;
            # 指定默认的 PHP 文件。
            fastcgi_index index.php;
            # 指定 PHP 脚本的文件路径。
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            # 包含 FastCGI 相关的参数
            include fastcgi_params;
        }
    }
}


```