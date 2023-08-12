


## 隐式事务
#### 查看
```sql
show variables like 'autocommit'
```
### 关键字
```sql
autocommit
```

### 如何关闭自动提交
#### 不让自动提交方式1
```sql
set autocommit = false;
```

#### 不让自动提交方式2
- `start transaction`: 以开头  不会自动提交
- 示例
```sql
start transaction;
update table set field = 1 where id = 1;
update table set field = 2 where id = 2;
commit;
```

### 事务控制或关于锁定的语句
> 1. 当我们在一个事务还没有提交或者回滚时就又使用`start transaction` 或 `begin`语句开启了另一个事务
> 这个时候会`隐式提交`上一个事务
```sql
begin;
select * from table where id = 1;
update table set field = 1 where id = 1;
#  没有commit 或者rollback
begin;
```
> 2. 当前的`autocommit`系统变量的值为`OFF`, 我们手动把它调为`ON`时, 也会隐式的提交前边语句所属的事务
> 3. 使用`LOCK TABLES`, `UNLOCK TABLES`等关于锁定的语句时, 也会`隐式的提交`前边语句所属的事务

### 加载数据的语句
> 使用`LOAD DATA`语句来批量往数据库中导入数据时, 也会`隐式的提交`前边语句所属的事务

### 关于mysql复制的一些语句
> 使用 `start slave`, `stop slave`, `reset slave`, `change master to`等语句时会`隐式的提交`前边语句所属的事务

### 其他的一些语句
> 使用`analyze table`, `cache index`, `check table`,`flush`, `load index into cache`,
> `optimize table`, `repair table`, `reset`等语句,也会`隐式的提交`前边语句所属的事务 