# 命令
- `docker run` 是用于启动一个容器的命令
- `-d`：后台运行容器。
- `-p` HOST_PORT:CONTAINER_PORT：将主机的端口映射到容器的端口。
- `-e KEY=VALUE`：设置环境变量。
- `IMAGE`：指定要使用的容器镜像。

## 创建MySQL容器
- 会创建一个名为 mysql-container 的容器，
- 使用 IP 地址 172.18.0.2 
- 将容器的端口 3306 映射到主机的端口 3307。
- 通过设置 MYSQL_ROOT_PASSWORD 环境变量为 1234qwer，为 MySQL 的 root 用户设置了密码。
- 使用最新的 MySQL 镜像 mysql:latest 来启动容器，
- 并将容器的端口映射到主机上，以便你可以通过主机的 3307 端口访问 MySQL 服务。
```
docker run -d --name mysql-container --ip 172.18.0.2 -p 3307:3306 -e MYSQL_ROOT_PASSWORD=1234qwer mysql:latest
```