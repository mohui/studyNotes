# 标签页
### 点击标签: @tab-click="clickHandle"
### 删除标签: @tab-remove="removeTab"
### 关闭其他标签 @contextmenu.prevent.native="openContextMenu($event)"

```ts
export default class aaaP{
    async delUser(phone) {
        //查询患者信息
        const selectPatientSQL = sqlRender(versionSQL.select_patient_id, {
            db: this.db.userPermissionCentre,
            phone
        });
        const patientId = (
            await testDB.execute(selectPatientSQL[0], ...selectPatientSQL[1])
        )?.[0]?.kn_id;
        if (!patientId) return false;
        await testDB.joinTx(async () => {
            
            
            let sql = sqlRender(versionSQL.delete_upcs_user, {
                db: this.db.userPermissionCentre,
                patientId
            });
            await testDB.execute(sql[0], ...sql[1]);
            sql = sqlRender(versionSQL.delete_dpm_patient_info, {
                db: this.db.doctorPatientManagement,
                patientId
            });
            await testDB.execute(sql[0], ...sql[1]);
            
            sql = sqlRender(versionSQL.update_xxjob, {
                db: this.db.xxlJob,
                patientId
            });
            await testDB.execute(sql[0], ...sql[1]);
            sql = sqlRender(versionSQL.delete_mr_health_plan, {
                db: this.db.medicationRemind,
                patientId
            });
            await testDB.execute(sql[0], ...sql[1]);
        });
        return true;
    }

}
```