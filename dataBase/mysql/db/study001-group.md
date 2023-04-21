# 窗口函数
- OVER()

## 把总数放到每一行中
```sql
select  *, count(id) over()  from person;

```

## having的用法
- 员工年龄大于20, 并且工作地方大于3人的地址
```sql
select address, count(1) counts from 表名 where age > 20 group by address having counts > 3
```

## 获取最后一次随访记录
```sql
select id,
       patient_id,
       patient_name,
       follow_date
from (select row_number() over (partition by patient_id order by follow_date asc ) as KeyId,
             id,
             patient_id,
             patient_name,
             follow_date
      from hs_htn_visit) a
where KeyId = 1

```