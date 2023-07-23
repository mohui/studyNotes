[npm](https://www.npmjs.com/)
### 安装包
- 镜像： 是一种文件存储形式， 一个磁盘上的数据在另一个磁盘上存在一个完全相同的副本即为镜像

### 查看当前的下包镜像源
- 官方的： https://registry.npmjs.org/
````
npm config get registry
````

### 将下包的镜像源切换为淘宝镜像源
```yarn
npm config set registry=https://registry.npm.taobao.org/
```


#### npm安装到 `devDependencies`
- 只在开发阶段用  上线阶段不用的安装到这个里面
```yarn
npm install 包名 -D
等价于
npm install 包名 --save-dev
```

### 卸载包
```
npm uninstall 包
```

#### nrm
- 为了更方便的切换下包的镜像源，我们可以安装nrm这个小工具，
- 利用nrm提供的终端命令可以快速查看和切换下包的镜像源

##### 全局安装nrm
```yarn
npm i nrm -g
```
##### 查看所有可用的镜像源
```yarn
nrm ls
```
##### 将下包的镜像切换为taobao镜像
```yarn
nrm use taobao
```



> 包后面的数字 如1.12.3
> 第一位数字， 大版本， 第二位数字： 功能版本， 第三位数字： bug修复版本
> 只要前面的数字增长了  后面的数字就要归零
##### 包是内置模块封装出来的，提供了更高级，更方便的API,极大提高了开发效率
> 包和内置模块的关系，类似于 `jquery`和`浏览器内置API`之间的关系

### 包
必须在项目根目录  且必须是叫`package.json`

#### 创建`package.json`
- 只能在英文目录下成功运行， 不能出现中文和空格. 
- 在执行命令的目录中， 快速创建 `package.json`文件
```yarn
npm init -y
```

##### dependencies
- 用来记录npm装了哪些包
