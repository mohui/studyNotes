#### nodejs的lts和current有什么区别
```
Current指的是当前发布的最新node版本，里面包含了最新的功能特性，但会不稳定，会不定期的进行更新优化或者修复问题；
LTS指的是长期支持的node版本，即稳定版，里面包含的功能就是稳定的。
```

#### 查看node当前版本
```yaml
node -v
```

## 安装nvm
[nvm地址](https://github.com/nvm-sh/nvm#installing-and-updating)安装
### 克隆
```yaml
gitStudy clone https://github.com/nvm-sh/nvm#installing-and-updating
```
### 进入nvm目录中执行install.sh
```markdown
直接把install.sh文件拖入终端回车
```

### 查看nvm版本号
```markdown
nvm -v 
```
如果报错 command not found 配置环境变量

在终端输入
```yaml
touch ~/.bash_profile
source ~/.bash_profile
. ~/.nvm/nvm.sh
```

### 打开环境变量文件
```yaml
open ~/.bash_profile
```

### 
```yaml
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
# This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
# This loads nvm bash_completio

```


## 安装corepack
>从 v16.13 开始，Node.js 发布了 Corepack 来管理包管理器。 这是一项实验性功能，因此您需要通过运行如下脚本来启用它：
```yaml
corepack enable
```
