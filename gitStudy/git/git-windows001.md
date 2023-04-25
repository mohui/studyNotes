## 配置Git
1. 安装完后，右键单击桌面空白处，
2. 选择Git Gui Here，进去之后，选择左上角的help选项，
3. 会出现一个Show SSH Key，然后点击“Generate Key”得到秘钥。将其复制到剪切板。
4. 打开GitHub，登陆后，打开设置界面，在SSH Keys栏中点击“Add SSH key”按钮，然后复制上面生成的秘钥。

## 开始使用git
1. 开始使用Git功能，右键单击桌面空白处，选择Git Bash Here.
2. 进去后便可进入git控制台，对于首次安装git的机器，一定要首先进行用户账户信息的配置：
3. 特别注意：--和global之间没有空格
4. git config --global user.name "你的github用户名"
5. git config --global user.email "你的github邮箱地址"
6. 将项目从GitHub上克隆到本地，首先打开你要想项目存放到本地的目录，
7. 例如：我的Git安装在E盘中，而我想将项目存放到D目录下的myProject中，操作如下：
8. 命令 d: 切换到 D盘
9. 然后git clone +你想要克隆的项目的地址。如： git clone https://github.com/mohui/1407C.git

## git命令
1. git status //查看当前项目文件状态，如果第一次，你会发现都红颜色的，因为它还没有交给git管理。
2. git add . //（.）点表示当前目录下的所有内容，交给git管理，也就是提交到了git的本地仓库。
3. git commit -m ‘添加说明’ //对你更新或修改了哪些内容做一个描述。</br>
4. git push -u origin master //将本地的项目提交到远程仓库中。