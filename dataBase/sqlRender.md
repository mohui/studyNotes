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

```javascript
await RoleModel.findAndCountAll({
      offset: (pageNo - 1) * pageSize,
      limit: pageSize,
      distinct: true,
      include: [
        {
          model: UserModel,
          attributes: {exclude: ['password']},
          through: {attributes: []}
        }
      ]
    })

      //查询与该规则挂钩的原有的指标
      const allTags = await RuleTagModel.findAll({where: {rule: ruleId}});
      //删除已经被解除的指标
      await Promise.all(
        allTags
          .filter(item => !tags.find(tag => tag.tag === item.tag))
          .map(async delTag => delTag.destroy())
      );

const currentTag = allTags.find(item => item.tag === tag.tag);
if (currentTag) {
    //存在则进行修改操作
    currentTag.algorithm = tag.algorithm;
    currentTag.baseline = tag.baseline;
    currentTag.score = tag.score;
if (tag.tag === MarkTagUsages.Attach.code) {
    currentTag.attachStartDate = tag.attachStartDate;
    currentTag.attachEndDate = tag.attachEndDate;
}
// 修改
return await currentTag.save();

// 添加
tag.ruleId = ruleId;
return await RuleTagModel.create(tag);

}
```