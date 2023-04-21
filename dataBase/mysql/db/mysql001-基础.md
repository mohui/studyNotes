## upsert 语句
```sql
insert into person(id, `name`, department)
VALUES(5, "葫芦娃-呜哇", 1) 
ON DUPLICATE KEY UPDATE name = "葫芦娃-五娃",
    department = 1
```