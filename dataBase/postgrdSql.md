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

```javascript
const [sql, params] = sqlRender(
      `
        select *
        from audit_log
        where extra ->> 'type' = 'check'
        {{#if start}}
          and time >= {{? start}} and time < {{? end}}
        {{/if}}
        {{#if account}}
            AND extra ->> 'account' like {{? account}}
        {{/if}}
        {{#if checkId}}
            AND extra ->> 'checkId' = {{? checkId}}
        {{/if}}
        order by created_at desc
      `,
      {
        account,
        checkId,
        start: start,
        end: end
      }
    );



await appDB.execute(
    `insert into audit_log(time, user_id, user_name, module, method, extra) values (?, ?, ?, ?, ?, ?)`,
    now,
    auditLogModel.user_id ?? ctx.user.id,
    auditLogModel.user_name ?? ctx.user.name,
    auditLogModel.module ?? ctx.module.name,
    auditLogModel.method ?? ctx.method.name,
    JSON.stringify(auditLogModel.extra)
 );
```


```javascript
    // 如果字段为数组
    const [sql, ruleParams] = sqlRender(
      `
      select id,
               name,
               permissions,
               deleted_at,
               creator
        from role
        where 1 = 1
        {{#if IsSuperAdmin}}
          and permissions:: text[] <@ array[{{#each allRoles}}{{? this}}{{#sep}},{{/sep}}{{/each}}]
        {{/if}}

        `,
      {
        allRoles: Context.current.user.permissions,
        IsSuperAdmin
      }
    );
```