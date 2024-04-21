# `composer`依赖管理工具

--- 

## `composer` 命令
```
# 查看某个命令的帮助
composer 命令名称 -- help
# composer 软件自身更新
composer self-update
# 查看所有命令
composer list
# 显示包信息
composer show 包名
# 生成自动加载文件 修改composer.json里的autoload参数后用它
composer dumpautoload
# 查询包
composer search 包名
# 显示全部的信息包括版本号
composer -v
# 全局安装插件包
composer require 包名
# 删除指定包,twbs/bootstrap包名路径
composer remove twbs/bootstrap
# 更新指定包,先要设置composer.json里的依赖关系再用它
composer update 包名
# 第一次使用composer用它,没有composer.json文件用它
composer install 包名
```