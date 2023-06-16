### 创建一个文件夹：
> 在任意位置创建一个文件夹，用于存放你的 Docker 配置文件和应用程序代码。

### 创建 docker-compose.yml 文件：
> 在上述文件夹中创建一个名为 docker-compose.yml 的文件，并将以下内容复制到文件中：

```
version: '3'
services:
  nginx:
    image: nginx:latest
    ports:
      - 80:80
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./code:/var/www/html

  php:
    image: php:latest
    volumes:
      - ./code:/var/www/html

  mysql:
    image: mysql:latest
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: your_mysql_password
    volumes:
      - ./mysql_data:/var/lib/mysql
```
- 这个 docker-compose.yml 文件定义了三个服务：nginx、php 和 mysql。
- 它们分别使用 Nginx、PHP 和 MySQL 的官方镜像，并配置了相应的端口映射和数据卷。

### 创建 nginx.conf 文件：
> 在上述文件夹中创建一个名为 nginx.conf 的文件，并将你的自定义 Nginx 配置复制到该文件中。  
> 你可以根据你的需求进行自定义配置，例如设置监听端口、虚拟主机配置等。
```
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    include mime.types;
    default_type application/octet-stream;

    sendfile on;
    keepalive_timeout 65;

    server {
        listen 80;
        server_name localhost;

        root /var/www/html;

        index index.php index.html;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
            fastcgi_pass php:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }
}
```


### 创建一个 code 文件夹：
> 在上述文件夹中创建一个名为 code 的文件夹，用于存放你的 PHP 应用程序代码。

### 启动容器：
> 在终端中切换到包含 docker-compose.yml 文件的文件夹，然后执行以下命令启动容器：

```
docker-compose up -d
```

- 这个命令将会根据 docker-compose.yml 文件中的定义启动三个容器：Nginx、PHP 和 MySQL。
- 参数 -d 表示在后台模式下运行容器。
* 现在，你已经在 Docker 中部署了一个完整的 PHP 环境，包括 Nginx、PHP 和 MySQL。
- 你可以通过访问 http://localhost 或 http://主机IP 来测试你的 PHP 应用程序。
* 请注意，以上步骤提供了一个基本的配置示例，适用于大多数情况。在实际部署中，你可能需要根据你的需求进行进一步的配置和调整。