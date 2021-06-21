### sql模板的应用
> 如果name === 123 不能用if判断,if判断只有true 和 false
```sql
{{#eq name '123'}}
    select * from staff limit 1
{{/eq}}
{{#eq name '345'}}
    select * from staff limit 12
{{/eq}}


{{#if account}}
    select * from staff where account like {{? account}}
{{/if}}
```

### sql模板的应用
> 基础用法
```sql
select 1 as value, dateTime as date
from tableName
where 1 = 1
  and {{dateCol}} >= {{? start}}
  and {{dateCol}} < {{? end}}
  and OperateOrganization in ({{#each hospitals}}{{? this}}{{#sep}},{{/sep}}{{/each}})
  {{#each columns}} and {{this}} {{/each}}
```