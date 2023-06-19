# 没有用

#### 安装 Docker Desktop
[前往 Docker 官方网站](https://www.docker.com/products/docker-desktop)下载 Docker Desktop 并按照指示进行安装。
#### 打开终端：在 Launchpad 或应用程序文件夹中找到并打开终端。
## 1. docker拉取nginx和php镜像
- 这里我直接拉最新版的 nginx latest（最新版本）
```
docker pull nginx:latest 
```
php我们就拉php7.4版本的fpm就好了
```
docker pull php:7.4-fpm
```
## 2. 使用 docker images 查看已安装的镜像
```
docker images
```

## 3.  创建容器
#### 先创建nginx文件夹存放等会php文件要挂载的目录，
- 我创建在 /Users/wanghehui/projects/xzmProjects/myphp 目录的
- mkdir -p <目录路径>
- mkdir -p /Users/wanghehui/projects/xzmProjects/myphp
```
mkdir -p /Users/wanghehui/projects/xzmProjects/myphp
```
> mkdir -p 是一个常用的命令，用于创建目录。  
> 它的作用是递归地创建指定的目录路径，即使上级目录不存在也会创建。  
> 其中，<目录路径> 是你想要创建的目录的路径，可以是相对路径或绝对路径。  
> 如果要创建的目录路径包含多级目录，例如 /path/to/directory，你可以使用以下命令： mkdir -p /path/to/directory  
> 使用 -p 参数，即使上级目录 path 和 to 不存在，也会被一并创建。   
> 注意，如果目录已经存在，mkdir -p 命令不会抛出错误或警告，而是继续执行而不做任何操作。  


#### 创建容器
```
docker run --name myphp -v /Users/wanghehui/projects/xzmProjects/myphp:/www/myphp -d 
```
c5fdabeef32a创建运行php的容器，名为 myphp

-v 代表挂载目录，将服务器外面的目录与创建的容器里的目录进行挂载，以后修改代码直接在容器外的服务器目录就可以修改了
-d 代表后台运行
c5fdabeef32a代表php-fpm 的镜像id，可通过docker images进行查看安装的镜像


#### 创建一个 PHP 文件
- 在刚刚创建的目录中创建一个名为 index.php 的 PHP 文件，并将以下代码复制到文件中：
- 这是一个简单的 PHP 文件，用于显示 PHP 环境的信息。
```php
<?php
    phpinfo();
?>
```
#### 创建一个 Dockerfile：在同一目录中创建一个名为 Dockerfile 的文件，并将以下内容复制到文件中：
- 这个 Dockerfile 使用官方的 PHP 镜像作为基础镜像，
- 并将当前目录中的所有文件复制到容器的 /var/www/html 目录下。
```
FROM php:latest
COPY . /var/www/html
```
#### 构建 Docker 镜像：在终端中运行以下命令，以构建 Docker 镜像：
- 这将根据 Dockerfile 中的配置构建一个名为 my-php-app 的 Docker 镜像。
```
docker build -t my-php-app .
```
#### 运行 Docker 容器：运行以下命令，以在 Docker 容器中运行 PHP 环境：
- 这个命令将创建一个名为 my-php-container 的容器，
- 将容器内的 80 端口映射到主机的 80 端口。
- 同时，将本地的 /path/to/php/files 目录挂载到容器内的 /var/www/html 目录，
- 这样你可以在容器中访问和编辑 PHP 文件。
```
docker run -d --name my-php-container -p 8080:80  my-php-app
docker run -d --name my-php-container -p 80:80 -v /Users/wanghehui/projects/xzmProjects/php-app:/var/www/html php:latest
docker run    --name my-php-container -p 80:80 -v /Users/wanghehui/projects/xzmProjects/php-app:/var/www/html php:latest

```
#### 访问 PHP 应用程序：在浏览器中访问 http://localhost:8080，即可查看 PHP 环境的信息。


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
      - 3307:3306
    environment:
      MYSQL_ROOT_PASSWORD: 1234qwer
    volumes:
      - ./mysql_data:/var/lib/mysql
```

