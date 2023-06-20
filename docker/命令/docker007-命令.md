# 其他命令

### 命令`lsof -i -n | grep "php-fpm" | wc -l`
> 这个命令将使用 lsof 命令来列出当前的网络连接，
> 并使用管道将输出传递给 grep 命令来筛选包含 "php-fpm" 的连接，
> 最后使用 wc -l 命令统计行数，即连接数量。

### 命令 `docker exec -it <container_id_or_name> bash`
> 进入到容器中
- eg: `docker exec -it php_fpm bash`