# redis
- [redis官网](https://redis.io/)
- [redis中文网](http://www.redis.cn/)

## 端口
- 默认端口`6379`
## 链接
>测试链接
```
ping
```
> `PONG`成功
## 简单存储
```
// 设置set基本值 
set name xizhangming
// 获取
get name 
```

### redis 能干嘛
> 1. 内存存储,持久化, 内存中是断电即失的,所以需要持久化
> 2. 效率高, 可以用于高速缓存
> 3. 发布订阅系统
> 4. 地图信息分析
> 5. 计时器, 计数器(浏览量)


### 特性
> 1. 多样性的数据类型
> 2. 持久化
> 3. 集群
> 4. 事务

## linux安装redis
> 1. 官网下载
> 2. 解压
> 3. 进入解压后的文件可以看到redis的配置文件`redis.conf`
> 4. 基本的环境安装
```base
yum install gcc-c++

// 安装好以后查看
gcc -v
```
> 5. 用 `make` 命令,会把所有需要的文件配置上, 需要一点时间
```
make

// make 完毕在执行
make install
```
> 6. redis 的默认安装路径`/usr/local/bin`
> 7. 将redis配置文件复制到目录下
```
// 创建一个文件夹
mkdir kconfig
// 把配置文件复制到创建的文件夹下, 注意这里是在bin目录下创建的,redis是5.0.8
cp /opt/redis-5.0.8/redis.conf kconfig
```
- 之后可以用这个文件进行启动
> 8. redis 默认不是后台启动, 需要修改配置文件
```
// 这个改为yes
daemonize yes
```
> 9. 启动redis服务
```
// 通过指定的配置文件启动
redis-server kconfig/redis.conf

// 查看是否启动
redis-cli -p 6379

// ping 结果是 PONG
ping

// 测试添加一个
set name whh
// 获取
get name
// 查看所有的key
keys *
```
> 10. 查看redis是否启动
```
ps -ef|grep redis
```
> 如何关闭redis服务
```
// 关闭redis
shutdown
// 退出
exit
// 再次查看进程是否存在
ps -ef|grep redis
```