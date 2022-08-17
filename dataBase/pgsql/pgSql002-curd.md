## postgres
```javascript
// 对象查询
const sql =`select * from tableName where extra ->> 'type' = 'check'`;
```

### in查询
```javascript
const sql = `select * from tableName where id in (${staffIds.map(() => '?')})`;
```

### 类似MySQL的ifnull
```sql
select item, score, COALESCE(rate,1) a  from his_staff_work_item_mapping order by updated_at desc;

-- 取第一条时间
select item, score, first_value(operate_time) over ()  operate_time  from his_staff_work_item_mapping order by updated_at desc;
-- 返回int类型
select cast(count(1) as int) from news_pv_mapping pv where pv.news = news.id
```

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


```javascript
const addList = [{id, name},{id, name},{id, name}];
const sql = `insert into
             tableName(id, name)
             values${addList.map(() => '(?, ?)').join()}`;

addList
    .map(it => [it.id, it.name])
    .reduce((prev, current) => {
        return [...prev, ...current];
    }, []);
```

## array_length 
> 如果 字段为数组, 得出数组的长度, 1参数是一维长度, 2为里面的二维的长度
```javascript
const sql = `
    select unnest(sources) as staff,
          case avg when true then rate / array_length(sources, 1)
            else rate end as rate
    from table
    where id = 'e2330bd0-bcca-467b-abc0-756778ba7f69';
`;
```

### unnest的用法
```javascript
/*
user 表
 id, users, rate
 1, ['张三', '李四'], 0.5
*/
const sql = `
    select unnest(users) as user, rate
    from user
    where staff = '1'`;
// 查询结果
/*
 张三 0.5,
 李四 0.5
*/
```

### 行转列
```javascript
const sql = `
    select
        metric.id,
        sum( case  when metric.name = 'HIS.OutpatientVisits' then metric.value else 0 end) "OutpatientVisits",
        sum( case  when metric.name = 'HIS.OutpatientIncomes' then metric.value else 0 end) "OutpatientIncomes",
        sum( case  when metric.name = 'HIS.DischargedVisits' then metric.value else 0 end) "DischargedVisits",
        sum( case  when metric.name = 'HIS.InpatientVisits' then metric.value else 0 end) "InpatientVisits",
        sum( case  when metric.name = 'HIS.InpatientIncomes' then metric.value else 0 end) "InpatientIncomes"
    from mark_metric metric
    where id = '24abb230-a9ed-49a7-bef0-043539b2f8c7'
    group by metric.id;
`;
```