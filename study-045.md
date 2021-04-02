```
// //创建新的考核记录
// const result = await this.$api.CheckSystem.add({checkName: cloneName});
// //获得新考核ID
// const newCheckId = result.checkId;
//
// //查询被克隆的细则列表
// const listRule = await this.$api.CheckSystem.listRule({
//   checkId: checkId
// });
// //遍历细则，重新创建
// const newListRule = listRule.rows.map(async it => {
//   //重新创建分类
//   const newGroup = await this.$api.CheckSystem.addRuleGroup({
//     checkId: newCheckId,
//     ruleName: it.ruleName
//   });
//
//   for (const item of it.group) {
//     //重新创建细则
//     const {
//       ruleName,
//       ruleScore,
//       checkStandard,
//       checkMethod,
//       evaluateStandard,
//       status,
//       ruleTags
//     } = item;
//     let newRule = await this.$api.CheckSystem.addRule({
//       checkId: newCheckId,
//       ruleName,
//       parentRuleId: newGroup.ruleId,
//       ruleScore,
//       checkStandard,
//       checkMethod,
//       status,
//       evaluateStandard
//     });
//     //设置指标
//     if (ruleTags?.length) {
//       await this.$api.RuleTag.upsert({
//         ruleId: newRule.ruleId,
//         tags: ruleTags.map(its => {
//           delete its.id;
//           delete its.name;
//           return its;
//         })
//       });
//     }
//   }
// });

// Promise.all(newListRule)
//   .then(() => {
//     this.$message({
//       type: 'success',
//       message: '快速复制成功！'
//     });
//   })
//   .catch(err => this.$message.error(err.message));
// this.$asyncComputed.listCheck.update();
```