
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