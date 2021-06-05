## postgres
```javascript
// 对象查询
const sql =`select * from tableName where extra ->> 'type' = 'check'`;
```

```javascript
const sql = `select * from tableName where id in (${staffIds.map(() => '?')})`;
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