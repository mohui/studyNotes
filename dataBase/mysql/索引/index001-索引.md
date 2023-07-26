# 索引
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
alter table book add UNIQUE uk_idx_name(book_name);
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

#### `explain`: 是否用了索引
```sql
explain select * from mr_health_plan where kn_id = 1572467224327749632;

```