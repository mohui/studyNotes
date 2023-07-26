# 全文索引
- 使用全文索引前, 搞清楚版本支持情况
- 全文索引比` like %`快n倍, 但是可能存在精度问题
- 如果需要全文索引的是大量数据,建议先添加数据,再创建索引

## 全文索引示例
- FULLTEXT INDEX: 全文索引关键字
- futxt_idx_info: 索引名称
- info: 索引字段
- info(50): 只给info的前50个单位创建索引
> 比如`字段info`的长度`255`, 只有前50个走索引
```sql
CREATE TABLE test4(
	id INT NOT  NULL,
	name CHAR(30) not  null,
	age INT NOT  NULL,
	info VARCHAR(255),
	-- 声明索引
	FULLTEXT INDEX futxt_idx_info(info(50))
);
```

## 全文索引用 `match`+`against`方式查询
```sql
select * from test4 where MATCH(title, context) AGAINST('要查询的字符串')
```