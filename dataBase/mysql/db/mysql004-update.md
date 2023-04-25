## 修改第一个为null取第二个
```sql
update mr_health_plan set kn_display_time = IFNULL(kn_cycle_start_time, kn_created_at)
```