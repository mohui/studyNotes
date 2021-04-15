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

```
{"ruleId":"faedef32-6171-4430-a35f-00cdac40dcf1","ruleName":"测试ya","budget":1,"projects":[]}
{"ruleId":"faedef32-6171-4430-a35f-00cdac40dcf1","ruleName":"测试ya","projects":[]}

function filterTag() {
  return ['Attach', 'HE08', 'HE10', 'HE11', 'HE12', 'HE13', 'SC00', 'SC01'];
}
```


```html

        <el-row>
                  <el-col :span="9" :xs="24" :sm="12" :md="12" :lg="9" :xl="9">
                    <div>
                      <el-date-picker
                        size="mini"
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </el-col>
                  <el-col :span="10" :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
                    <el-select
                      v-if="selFlag === 'table' && !single"
                      size="mini"
                      v-model="hospitalIds"
                      multiple
                      collapse-tags
                      style="margin-left: 20px; width:90%"
                      placeholder="机构"
                    >
                      <el-option
                        v-for="item in hospitalOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-select
                      v-if="selFlag === 'trend' && !single"
                      size="mini"
                      v-model="hospitalId"
                      style="width:90%"
                      placeholder="机构"
                    >
                      <el-option
                        v-for="item in hospitalOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col v-if="totalFlag" size="mini" :span="3" :xs="24" :sm="12" :md="12" :lg="3" :xl="3" :offset="single ? 13 :2">
                    <span style="font-size: 14px">最新总分(分):  {{ getWorkPointTotal }}</span>
                  </el-col>
                  <!--          <el-col v-if="totalFlag && selFlag === 'table'" size="mini" :span="3">-->
                  <!--            <el-link type="primary" @click="dailyList('trend')">图表统计</el-link>-->
                  <!--          </el-col>-->
                  <!--          <el-col v-if="totalFlag && selFlag === 'trend'" size="mini" :span="3">-->
                  <!--            <el-link type="primary" @click="dailyList('table')">列表统计</el-link>-->
                  <!--          </el-col>-->
                </el-row>
```