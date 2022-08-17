

## 当前时间 - 生日
```sql
select kn_id,
       kn_birthday,
       CAST(floor((date_format(curdate(), '%Y') - date_format(kn_birthday, '%Y'))) as unsigned) as ageRange
from test
```