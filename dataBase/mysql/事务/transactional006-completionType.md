# completion_type
> 这个参数有三种可能
### 等于0
> `completion_type=0`这是`默认情况`，当我们执行`commit`的时候会提交事务，
> 在执行下一个事务时，还需要使用`START TRANSACTION`或`BEGIN`来开启
- 
> 不论是否采用`start transaction`或者`begin`的方式来开启事务，都需要用`commit`进行提交，让事务生效，使用rollback对事务进行回滚
### 等于1
> `completion_type=1`这种情况下，当我们提交事务后，相当于执行了`commit and chain`,
> 也就是开启了一个链式事务，即当我们提交事务之后会开启一个相同隔离级别的事务
- 补充
> 每条sql语句都会自动进行提交，不过这时候，如果采用`start transaction`或者`begin`的方式来显式的开启事务，
> 那么这个事务只有在commit时才会生效,在`rollback`时才会回滚
### 等于2
> `completion_type=2`这种情况下，`commit=commit and release`,也就是当我们提交后，会自动与服务器断开连接

# 保存点`savepoint`
```sql
-- 创建一个user3表，两个字段
create table user3(name varchar(30), balance decimal(10, 2)); 
-- 开启事务
begin;
-- 添加一条数据
insert into user3(name, balance) values('张三', 1000);
select * from name = '张三' -- 张三 1000
commit;
--再次开启事务
begin;
-- 修改
update user3 set balance = balance - 100 where name = '张三'; -- 900
update user3 set balance = balance - 100 where name = '张三'; -- 800
-- 设置保存点
savepoint  s1;
update user3 set balance = balance + 1 where name = '张三'; -- 801
select * from name = '张三'; -- 张三 801
-- 回滚到保存点 s1
rollback to s1;
select * from name = '张三'; -- 张三 800
rollback;
select * from name = '张三'; -- 张三 1000

```