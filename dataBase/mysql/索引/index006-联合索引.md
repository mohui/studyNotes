# 联合索引

## 字段 a,b,c是联合索引,如何使用
> `idx_a_b_c`: 索引名
- 最左原则
首先必须使用`字段a`(因为是先按照`字段a`排序), 才能在`字段a`的基础上找到`字段b`

## 用到 `a,b,c`
```sql
SELECT * FROM tableName where a = 1 and b = 2 and c = 4;

-- 也能用到, 但是不建议, 因为mysql会优化为 `a = 1 and b = 2 and c = 4`, 增加了mysql负担
SELECT * FROM tableName where b = 2 and c = 4 and a = 1;
```

## 用到`a,b`
- 中间是范围查找, 就不会用第三个了
```sql
SELECT * FROM tableName where a = 1 and b > 2 and c = 4
```

## 用到`a`
- 中间的不能断
```sql
SELECT * FROM tableName where a = 1 and c = 4
```

## 可能一个都用不到
> 第一个就范围查找, 可能一个都不会用
```sql
SELECT * FROM tableName where a > 1 b = 2 and c = 4
```

## 一个都用不到
> 最左原则
> 没有最左边的a 后面的都是无序的
```sql
SELECT * FROM tableName where b = 2 and c = 4
```


## 这条sql可能用不到索引
> 虽然符合最左原则, 但是最左边是范围, 所以可能会全表
```sql
SELECT * FROM tableName where a > 1 and b = 2 and c = 4
```