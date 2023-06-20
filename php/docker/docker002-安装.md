### 创建一个文件夹：
> 在任意位置创建一个文件夹，用于存放你的 Docker 配置文件和应用程序代码。

### 创建 docker-compose.yml 文件：
> 在上述文件夹中创建一个名为 docker-compose.yml 的文件，并将以下内容复制到文件中：
```yaml
# 是 Docker Compose 文件的版本号。在这种情况下，使用的是版本 3
version: '3'

# 这定义了一个名为 nginx 的服务。它使用的是最新版本的 Nginx 镜像。
services:
  nginx:
    # 这定义了一个名为 nginx 的服务。它使用的是最新版本的 Nginx 镜像。
    image: nginx:latest
    # 通过 ports 部分，将主机的 80 端口映射到容器的 80 端口。
    ports:
      - 80:80
    # 通过 volumes 部分，将主机上的 nginx.conf 文件映射到容器的 /etc/nginx/nginx.conf
    # 将主机上的 html 目录映射到容器的 /usr/share/nginx/html
    # 将主机上的 logs/nginx 目录映射到容器的 /var/log/nginx。
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./html:/usr/share/nginx/html
      - ./logs/nginx:/var/log/nginx
  #   - ./default.conf:/etc/nginx/conf.d/default.conf
  # 这定义了一个名为 php 的服务。
  php:
    # 它使用的是最新版本的 PHP 镜像。
    image: php:7.4-fpm
    ports:
      - 9000:9000
    # restart: always 表示容器在退出后会自动重启。
    restart: always
    # container_name: php-fpm 设置容器的名称为 php-fpm。
    container_name: php_fpm
    # volumes 部分，将主机上的 html 目录映射到容器的 /var/www/html
    volumes:
      - ./html:/var/www/html
    # stdin_open: true 和 tty: true 配置允许通过命令行与容器进行交互。
    stdin_open: true
    tty: true
  # 这定义了一个名为 mysql 的服务。它使用的是最新版本的 MySQL 镜像。通过 ports 部分，将主机的 3307 端口映射到容器的 3306 端口。
  mysql:
    image: mysql:latest
    ports:
      - 3307:3306
    # 通过 environment 部分，设置 MySQL 的环境变量，其中 MYSQL_ROOT_PASSWORD 设置了根密码为 1234qwer。
    environment:
      MYSQL_ROOT_PASSWORD: 1234qwer
    # 通过 volumes 部分，将主机上的 mysql_data 目录映射到容器的 /var/lib/mysql，这样可以持久化存储 MySQL 的数据。
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
        server_name 127.0.0.1;

        root /var/www/html;
        index index.php index.html;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
            fastcgi_pass php_fpm:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }
}
```


### 创建一个 html 文件夹：
> 在上述文件夹中创建一个名为 html 的文件夹，用于存放你的 PHP 应用程序代码。

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