## 两个时间之间有多少日
```sql
select VisitDate, NewbornBirthDay,operatorid,
       age( VisitDate, NewbornBirthDay),
       date_part( 'day', VisitDate - NewbornBirthDay) b
from mch_new_born_visit
where
      date_part( 'day', VisitDate - NewbornBirthDay) > 27 and
    date_part( 'day', VisitDate - NewbornBirthDay) < 32
    and VisitDate > '2021-01-01T16:00:00.000Z'
and OperateOrganization = '24abb230-a9ed-49a7-bef0-043539b2f8c7';
```