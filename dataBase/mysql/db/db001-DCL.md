# mysql
- 在mysql中,用户信息,用户权限信息,存放在系统数据库mysql的user表中
### 查询用户
```sql
use mysql;
select * from user;
```
### 创建用户
```sql
create user '用户名'@'主机名' identified by '密码'
```
#### 创建用户 whh 只能在当前主机localhost访问数据库, 密码 123456
```sql
create user 'whh'@'localhost' identified by '123456'
```
#### 创建用户 xzm 能在任意主机访问数据库, 密码 123456
```sql
create user 'xzm'@'%' identified by '123456'
```

### 修改用户密码
```sql
alter user '用户名'@'主机名' identified with mysql_native_password by '新密码';
```
#### 修改用户whh的访问密码为 1234
```sql
alter user 'whh'@'localhost' identified with mysql_native_password by '1234';
```
### 删除用户
```sql
drop user '用户名'@'主机名'
```


# 权限
### 查询权限
```sql
show grants for '用户名'@'主机名'
```

### 授予权限
- 多个权限之间,使用逗号分割
- 授权时, 数据库名和表名可以用*进行通配, 代表所有
```sql
grant 权限列表 on 数据库名.表名 to '用户名'@'主机名'
```
### 撤销权限
```sql
revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名'
```
