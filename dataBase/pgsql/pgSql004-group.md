### 组内排序
```sql
-- 按照 area分组,按照 created_at 排序, KeyId = 1 的是组内排序条件第一条
select d.id, d.staff, d.area, d.status, d.hide
from (select row_number() over (partition by area order by created_at desc ) as KeyId,
             id,
             staff,
             area,
             status,
             hide
      from staff_request
      where staff = '513c79a8-ed20-4c01-a3d9-7616d3903f62') d
where keyId = 1;
```
