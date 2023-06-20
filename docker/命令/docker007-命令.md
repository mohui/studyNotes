# 其他命令
- 
### 命令`docker exec -it php-fpm /bin/bash`
> 该命令是用于在正在运行的PHP-FPM容器中打开一个交互式的终端。
- docker exec：用于在运行中的容器中执行命令。
- -it：指定交互式终端。
- php-fpm：容器的名称或ID。
- /bin/bash：要执行的命令，这里是打开一个Bash终端。
- 运行该命令后，您将进入PHP-FPM容器的命令行界面，可以在其中执行各种命令、查看文件等操作。






### 命令`lsof -i -n | grep "php-fpm" | wc -l`
> 这个命令将使用 lsof 命令来列出当前的网络连接，
> 并使用管道将输出传递给 grep 命令来筛选包含 "php-fpm" 的连接，
> 最后使用 wc -l 命令统计行数，即连接数量。

### 命令 `docker exec -it <container_id_or_name> bash`
> 进入到容器中
- eg: `docker exec -it php_fpm bash`