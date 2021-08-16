

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