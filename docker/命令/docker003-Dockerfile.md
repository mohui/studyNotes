# Dockerfile
- Dockerfile 是用于构建 Docker 镜像的文本文件。也叫命令参数脚本文件。
- 它包含一系列的指令和参数，用于定义构建过程中的操作步骤和配置。
- 通过编写 Dockerfile，可以定义如何构建一个基于特定配置的 Docker 镜像。
- Docker 镜像是一个轻量级、可移植的软件包，它包含了运行应用程序所需的一切，包括代码、运行时环境、系统工具、库文件等。
- Dockerfile 中的指令可以指定镜像的基础操作系统、安装软件包、复制文件、设置环境变量、运行命令等。
- 这个脚本文件中每一行命令都会构建一层镜像，所以一个完整的镜像是多层的。

## 构建docker镜像的步骤
- 编写好一个DockerFile脚本文件
- 通过docker的构建命令docker build去执行`dockerFile`脚本文件，进行构建制作相应的镜像
- 通过docker的运行命令docker run，可以将docker镜像运行出容器
- 通过docker的发布镜像命令docker push，可以将docker镜像推送到镜像仓库(DockerHub、阿里云镜像仓库、Harbor镜像仓库)

## 常见的 Dockerfile 指令：
- `FROM`：指定基础镜像。
- `RUN`：在容器中执行命令。
- `COPY`：复制文件或目录到容器中。
- `ADD`：复制文件或目录到容器中，并可以自动解压缩和远程 URL 下载。
- `ENV`：设置环境变量。
- `WORKDIR`：设置工作目录。
- `EXPOSE`：声明容器监听的端口。
- `CMD`：容器启动后默认执行的命令。

> 通过在 Dockerfile 中定义这些指令，可以构建一个可重复、可移植、自动化的 Docker 镜像，简化应用程序的部署和分发过程。

> 要构建 Docker 镜像，需要在拥有 Docker 环境的机器上执行 docker build 命令，并指定 Dockerfile 的路径。
Docker 将按照 Dockerfile 中定义的指令逐步执行构建过程，并生成一个新的镜像。

>总之，Dockerfile 是用于定义构建 Docker 镜像的文件，它描述了构建过程中的操作和配置，
使得镜像的构建过程可重复和自动化。
