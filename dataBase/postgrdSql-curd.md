```javascript
const add = `
    alter table 表名 add 要新增的字段 varchar(255)
`;
const del = `
    alter table 表名 drop 要删除的字段名
`
// 变更字段名
const update = `
    alter table 表名 rename 要变更的字段 to 变更后的字段名
`;
// 变更字段大小 比如把 varchar(255) 变为 varchar(100)
const update2 = `
    alter table 表名 alter 变更的字段名 type varchar(100)
`;
// 加索引
const index = `
    create index 字段名_index on 表名(字段名)
`;
// 删除索引
const delIndex = `
    drop index 索引名
`
```