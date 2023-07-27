## 普通索引
- 创建一个book表, 索引字段为`book_name`
- INDEX: 创建普通索引关键字
- idx_bname: 索引名称
- book_name: 索引字段
```sql
CREATE TABLE book(
	book_id INT,
	book_name VARCHAR(100),
	authors VARCHAR(100),
	info VARCHAR(100),
	comment VARCHAR(100),
	year_publication YEAR,
	-- 声明索引
	INDEX idx_bname(book_name)
);
```

## 降序索引
- a: 按照 1, 2, 3排序
- b: 按照 3, 2, 1排序
```sql
CREATE table tsl(
    a int,
    b int,
    index idx_a_b(a asc, b desc)
);
```

## 隐藏索引(INVISIBLE)
- 关键字: INVISIBLE
- 隐藏后, 索引不再生效
- 主键不能设为隐藏索引
```sql

CREATE TABLE book2(
	book_id INT,
	book_name VARCHAR(100),
	authors VARCHAR(100),
	info VARCHAR(100),
	comment VARCHAR(100),
	year_publication YEAR,
	-- 隐藏索引
	INDEX idx_bname(book_name) invisible
);
```

### 添加隐藏索引的两种方法
```sql
-- 方法1
alter table book2 add UNIQUE INDEX uk_idx_id(book_id) invisible
-- 方法2
create index idx_year_pub on book2(year_publication) invisible
```

### 修改索引为可见
- alter table 表名 alter index 索引名 visible
```sql
alter table book2 alter index uk_idx_id visible
```