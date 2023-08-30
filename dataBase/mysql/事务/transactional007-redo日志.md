# redo日志
- redo log称为`重做日志`，提供在写入操作，恢复提交事务修改的页操作，用来保证事务的`持久性`

> redo log: 是存储引擎（innodb）生成的日志，记录的是`物理级别`上的页修改操作，
> 比如页号`xxx`,偏移量`yyy`,写入了`zzz`数据，主要为了保证数据的可靠性

### 流程
> 1. 先将原始数据从磁盘中读入内存中来，修改数据的内存拷贝
> 2. 生成一条重做日志并写入`redo log buffer`,记录的是数据被修改后的值
> 3. 当事务`commit`时，将`redo log buffer`中的内容刷新到`redo log file`,对`redo log file`采用追加写的方式
> 4. 定期将内存中修改的数据刷新到磁盘中


```sql
show variables like 'innodb_flush_log_at_trx_commit';
```

> `innodb_flush_log_at_trx_commit = 1`
> 为1时候
> 
>

> `innodb_flush_log_at_trx_commit = 1`
> 1. 为2时候，只要事务提交成功，`redo log buffer`中的内容只写入文件系统缓存（page cache）
> 
>


> `innodb_flush_log_at_trx_commit = 0`
> 1. 为0时候，master thread中每1秒