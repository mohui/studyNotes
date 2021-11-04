

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

## 时间算法sql的应用
```javascript
// 两个时间之间有多少日
`select VisitDate, NewbornBirthDay,operatorid,
       age( VisitDate, NewbornBirthDay),
       date_part( 'day', VisitDate - NewbornBirthDay) b
from mch_new_born_visit
where
      date_part( 'day', VisitDate - NewbornBirthDay) > 27 and
    date_part( 'day', VisitDate - NewbornBirthDay) < 32
    and VisitDate > '2021-01-01T16:00:00.000Z'
and OperateOrganization = '24abb230-a9ed-49a7-bef0-043539b2f8c7'`;
```

### 在研究
```
select extract(month from now());

```