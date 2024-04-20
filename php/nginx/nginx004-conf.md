# nginx.conf

#### http的include
> 1. 给Nginx添加`include`包含语法， 让其他目录下配置文件参数，导入到`nginx.conf`,能够让nginx看起来更简洁
```bash
# 和nginx.conf同级下的vhosts文件夹里的所有`.conf`文件
http {
  include vhosts/*.conf;
}
```