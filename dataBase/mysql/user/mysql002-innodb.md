# innoDB
- innoDB 是聚集索引
> 索引和数据放在一个文件中

## 存储文件
- test_innodb.frm: Frame = 表结构
- test_innodb.idb: innodb Data = 表索引 + 数据

#### 查看 InnoDB 存储引擎的页大小（InnoDB page size）
```sql
SHOW GLOBAL STATUS LIKE 'Innodb_page_size';
```

