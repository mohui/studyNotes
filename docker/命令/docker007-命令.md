# docker 命令

## 参数说明
- `docker run` 是用于启动一个容器的命令
- `-d`：后台运行容器。
- `-p` HOST_PORT:CONTAINER_PORT：将主机的端口映射到容器的端口。
- `-e KEY=VALUE`：设置环境变量。
- `IMAGE`：指定要使用的容器镜像。
- `-v` 命令用于将宿主机的目录或文件与容器中的目录或文件进行挂载，以实现宿主机和容器之间的数据共享。

## 列出容器
### 列出运行中容器: `docker container ls`
> `docker container ls` 是 `docker ps` 命令的新版本，
> 从 Docker 1.13 版本开始引入。它提供了更简洁和易于记忆的输出格式，并且默认只显示运行中的容器。

### 列出运行中容器: `docker ps`
> `docker ps` 是较早版本的命令，也是 `docker container ls` 的别名。
> 它仍然保留在 Docker 中以保持向后兼容性，并且在许多教程和文档中仍然广泛使用。

### 列出所有容器: `docker ps -a`

### 进入容器中: `docker exec -it <container_name_or_id> <command>`
- `<container_name_or_id>` 是要进入的容器的名称或 ID。
- `<command>` 是要在容器内执行的命令，通常是一个交互式的 shell，如 /bin/bash 或 /bin/sh。

#### eg: `docker exec -it php-fpm /bin/bash`
> 该命令是用于在正在运行的PHP-FPM容器中打开一个交互式的终端。
- `docker exec`：用于在运行中的容器中执行命令。
- `-it`：指定交互式终端。
- `php-fpm`：容器的名称或ID。
- `/bin/bash`：要执行的命令，这里是打开一个Bash终端。
- 运行该命令后，您将进入PHP-FPM容器的命令行界面，可以在其中执行各种命令、查看文件等操作。

### 将宿主机的目录挂载到容器的目录：`docker run -v /host/path:/container/path image_name`
> 这将把宿主机上的 /host/path 目录挂载到容器中的 /container/path 目录。

### 将宿主机的文件挂载到容器的目录：`docker run -v /host/file:/container/path/file image_name`
> 这将把宿主机上的 /host/file 文件挂载到容器中的 /container/path/file。

### 创建一个匿名卷（宿主机路径由 Docker 管理）: `docker run -v /container/path image_name`
> 这将在容器中创建一个匿名卷，并将其挂载到 /container/path。

### 命令`lsof -i -n | grep "php-fpm" | wc -l`
> 这个命令将使用 lsof 命令来列出当前的网络连接，
> 并使用管道将输出传递给 grep 命令来筛选包含 "php-fpm" 的连接，
> 最后使用 wc -l 命令统计行数，即连接数量。
