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

## docker-compose up -d
>`docker-compose up -d` 命令用于启动 Docker Compose 配置文件中定义的所有服务，
> 并在后台运行（守护进程模式）。

- 确保您的当前工作目录中包含正确的 docker-compose.yml 文件。
- 打开终端或命令提示符，并导航到包含 docker-compose.yml 文件的目录。
- 运行命令 docker-compose up -d。
- Docker Compose 将读取配置文件并启动所有服务。每个服务将在独立的容器中运行。
- 终端将输出每个容器的名称和状态，如果一切顺利，您将看到容器正在启动的信息。
- 一旦容器启动完成，您可以关闭终端窗口，服务将继续在后台运行。
> 请注意，-d 参数是指在后台运行容器，如果不使用该参数，将会在终端中显示容器的日志输出。

> 如果有必要，您可以使用其他 Docker Compose 命令（例如 docker-compose down）来停止和管理容器。

> 确保您的配置文件正确并且所需的映像可用，以避免出现错误或问题。





