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