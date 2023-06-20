# docker下安装PHP环境
- 以下两个文件放好以后执行命令 `docker-compose up -d`

## docker-compose.yml
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

## nginx.conf
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