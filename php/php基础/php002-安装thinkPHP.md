## 下载 phpStudy
```
6.0版本开始,必须通过`composer`方式安装和更新,所以你无法通过`git`下载安装
```

## 安装 `Composer` 
> `Composer`: 全国全量镜像
* 在Windows中 [下载Composer软件](https://getcomposer.org/Composer-Setup.exe)

```
第一步: 双击下载好的`composer`运行程序
第二步: 选择要安装的盘符
第三步: 选择PHP版本,如果你是集成包环境,就到集成包里找PHP
第四步: 全部下一步
```

## 二 设置`Composer`下载源
- 先设置`Composer`的下载源,也是镜像地址
- 在命令行窗口或者控制台输入
```
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```
- 如果`phpcomposer`镜像有问题,可以换下面的
```
composer config -g repo.packagist composer https://packagist.laravel-china.org
```