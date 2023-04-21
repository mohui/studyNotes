# 改为可多次被选, 所以删掉了disabled
> 备份删除了disabled
```vue
<div>
  <el-select
    v-model="row.staffs"
    multiple
    collapse-tags
    filterable
    size="mini"
  >
    <el-option
      v-for="m in memberList"
      :key="m.id"
      :label="m.name"
      :value="m.id"
      :disabled="
        newMember.subMembers.some(
          it =>
            !row.staffs.includes(m.id) &&
            it.staffs.some(s => s === m.id)
        )
      "
    ></el-option>
  </el-select>
</div>

```

```javascript
export default {
    // 条件改为员工id, 提示改为考核员工
  methods: {
    async removeRow(row) {
          console.log(row);
          try {
            await this.$confirm(
              `确定删除 ${row.member} 和 "${row.subMember}"该配置?`,
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }
            );
            row.removeLoading = true;
            await this.$api.HisStaff.delHisStaffWorkSource(row.id);
            this.$message.success('删除成功');
            this.$asyncComputed.serverData.update();
            this.$asyncComputed.serverMemberData.update();
          } catch (e) {
            e !== 'cancel' ? this.$message.error(e?.message) : '';
          } finally {
            row.removeLoading = false;
          }
        }
  }
}
```