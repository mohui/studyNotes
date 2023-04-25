# git 命令
1. 查看git版本
```bash
gitStudy --version
```
2. 查看远程分支信息
```bash
gitStudy remote -v
```
3. 移除远程分支信息,删除关联的origin的远程库
```bash
gitStudy remote rm origin
```

# github的应用
1. 点击New,跳转到 Create a new repository(创建仓库)
2. 填上Repository name(存储库名称)如: nodeProjects=>点击create repository 
3. 在本地创建一个文件夹,和创建的仓库同名,如: nodeProjects
4. 进入nodeProjects文件夹,在命令行运行 git init, 此时这个文件夹被Git管理,相当于一个项目
5. 新建一个文件, 如index.js
6. 把文件推送到本地仓库, git add index.js  如果有很多,执行 git add -A
7. git commit -m "提交项目"
8. 关联远程仓库,分为两种https 和ssh,以下是通过配置ssh的,所以选ssh,用

>在命令行执行…or push an existing repository from the command line

>第一行代码,如: git remote add origin git@github.com:mohui/nodeProjects.git

>(第一行代码,如: git remote add origin https://github.com/mohui/nodeProjects.git)这一行不用

>8.1:如果没有配置ssh (8.1以下仅为跳过免密,可以跳过直接执行9)

>8.1.1 重新打开终端 执行命令

## 查看当前用户下是否有这个文件，有内容直接跳到第3步
```
cat ~/.ssh/id_rsa.pub
```

>8.1.2 查看是否有这个文件(公钥), 如果没有 执行命令

```
## -t指定密钥类型（默认是rsa,可以省略） -C设置注释文字，比如邮箱 -b指定密钥长度，对于rsa密钥，默认是2048位，最小要求768位
## 有提示一路回车就行
ssh-keygen -t rsa -C "你的Git注册邮箱" -b 2048
### 执行第一步获取公钥（ssh key）
```

>8.2: 进入Github ,在主页点击setting, 选择SSH and GPG keys

>8.2.1: 把生成的公钥放入Key中

>8.2.2: Title可以随便写,备注

>点击 add ssh key

>9: 把项目推到远程 git push origin master

>10: 输入用户名,密码即可推送成功

