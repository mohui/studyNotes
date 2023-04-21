## 当前时间
```sql
-- 当天0点
SELECT DATE_FORMAT(CURDATE(),'%Y-%m-%d %H:%i:%s');
-- 今天9点
SELECT DATE_ADD(CURDATE(), INTERVAL 9 HOUR);-- 2015-09-28 09:00:00
```


## 当前时间加减一天
```sql
-- 减一天
select date_sub(NOW(),INTERVAL 1 day)
-- 加一天
select date_add(now(), interval 1 day);
```