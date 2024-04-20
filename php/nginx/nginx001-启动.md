## 启动nginx

### linux版
#### 进入安装好的目录
> `/usr/local/nginx/sbin`
```bash
./nginx # 启动
./nginx -s stop # 快速停止
./nginx -s quit # 优雅关闭, 在退出钱完成已经接受的链接请求
./nginx -s reload # 重新加载配置

```

#### 防火墙
```bash
# 关闭防火墙
systemctl stop firewalld.service
# 禁止防火墙开机启动
systemctl disable firewalld.service

```
#### 
```bash
```