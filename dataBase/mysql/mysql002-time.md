

## 当前时间 - 生日
```sql
select ddi.kn_id, ddi.kn_birthday,
       CAST(floor((date_format(curdate(), '%Y') - date_format(ddi.kn_birthday, '%Y'))) as unsigned) as ageRange
from dpm_patient_info ddi
```