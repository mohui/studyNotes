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