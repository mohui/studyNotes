[docker學習](https://www.bilibili.com/video/BV1gr4y1U7CY?p=17&vd_source=39f266c622d872c7f9fb6ec3d2ad3a60)
# docker

- 解决了 运行环境和配置问题的软件容器
- 方便做持续集成并有助于整体发布的容器虚拟化技术

## docker的基本组成
- 镜像
- 容器
- 仓库

### 镜像(image)
1. docker 镜像 就是一个 只读 的模版. 镜像可以用来创建 Docker 容器, 一个镜像可以创建很多容器

2. **docker镜像文件类似于Java的类模板, 而docker容器实例类似于Java中New出来的实例对象**
### 容器(container)
```
一个容器运行一种服务, 当我们需要的时候, 就可以通过docker客户端创建一个对应的运行实例,也就是我们的容器
```
### 仓库(repository)
- 仓库(repository) 是`集中存放镜像`文件的场所
- 类似于: github仓库, 存放各种git项目的地方;
- 仓库分为公开仓库(publish) 和私有仓库(Private) 两种形式
- 最大的公开仓库是 Docker Hub(https://hub.docker.com/)
- 存放了数量庞大的镜像供用户下载, 国内的公开仓库包括阿里云,网易云等