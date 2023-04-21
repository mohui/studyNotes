## docker 命令
```markdown
启动docker: systemctl start docker
停止docker: systemctl stop docker
重启docker: systemctl restart docker
查看docker状态: systemctl status docker
开机启动: systemctl enable docker
查看docker概要信息: docker info
查看docker总体帮助文档: docker --help
查看docker命令帮助文档: docker 具体命令 --help
```

### docker images 列出本地主机上的镜像
- docker images 列出本地主机上的镜像
- docker images -a 列出本地所有的镜像(含历史)
- docker images -q 只显示镜像ID

|     标签      |       说明 |
|:-----------:|---------:|
| REPOSITORY  | 表示镜像的仓库源 |
| DESCRIPTION | 镜像的标签版本号 |
|    STARS    |     镜像ID |
|  OFFICIAL   |   镜像创建时间 |
|  AUTOMATED  |     镜像大小 |

## docker search 某个镜像名字
- docker search redis

|         命令         |       说明 |
|:------------------:|---------:|
|        NAME        |     镜像名称 |
| docker pull 某个镜像名字 |     镜像说明 |
|      IMAGE ID      |     点赞数量 |
|      CREATED       |   是否是官方的 |
|        SIZE        | 是否是自动构建的 |

```markdown

docker pull 某个镜像名字
```