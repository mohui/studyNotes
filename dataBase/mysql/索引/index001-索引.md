# 索引
- 如果这里没有, 基本上再普通索引里
## 适合加索引
- 字段的数值有唯一性的限制
> 业务上具有唯一特性, 即使是组合索引
- 频繁作为`where`查询条件的字段
- 使用最频繁的列放到联合索引左侧
> 在多个字段都要创建索引的情况下, 联合索引优于单值索引

###  限制索引的数目
- 索引的数目并不是越多越好, 建议单张表索引不要多于6个
- 原因:
> 1. 每个索引都需要占用磁盘空间, 索引越多, 需要的磁盘空间就越大
> 2. 索引会影响`insert`,`delete`, `update`等语句的性能, 因为表中的数据更改时候, 索引也会进行调整和更新, 会造成负担
> 3. 优化器在选择如何优化查询时, 会根据统一信息, 对每一个可以用到的`索引来进行评估`, 以生成出一个最好的执行计划, 
> 如果同时有很多个索引,都可以用于查询, 会增加mysql优化器生成执行计划时间, 减低查询性能

### 查看索引
> book: 表名
```sql
SHOW CREATE TABLE book;
-- 或者
SHOW INDEX FROM book;
```
### 创建索引1
- alter table 表名 add 索引
> book: 表名
```sql
-- 普通索引, 字段 [comment]
alter table book add index idx_cmt(comment);
-- 唯一索引, 字段 [book_name]
alter table book add UNIQUE INDEX uk_idx_bname(book_name);
-- 联合索引, 字段 [book_id, book_name, info]
alter table book add index mul_bid_bname_info(book_id, book_name, info);
```
### 创建索引2
- create index 索引名 ON 表名(字段名)
```sql
create index idx_cmt ON book(comment);
create UNIQUE index idx_cmt ON book(comment);
create index mul_bid_bname_info ON book(book_id, book_name, info);

```

### 删除索引1
- alter table 表名 drop index 索引名
```sql
alter table book drop index idx_cmt;
```

### 删除索引2
- drop index 索引名 on 表名
```sql
drop index idx_cmt on book;
```

### 强制使用索引
> 索引名为 `idx_name_age_position`
#### FORCE INDEX
```sql
-- 这条sql可能会不用索引
select * FROM TABLE where name > '张三' and age = 18 and position = 'bj';
--强制让它用索引`idx_name_age_position`
select * FROM TABLE FORCE INDEX (idx_name_age_position) where name > '张三' and age = 18 and position = 'bj'
```