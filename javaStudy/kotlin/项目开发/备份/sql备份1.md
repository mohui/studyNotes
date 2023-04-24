```sql
-- 数据库Schema描述文件, 执行DDL操作
# update hs_cerebral_stroke_leave_hospital_visit hospital set follow_date = hospital.created_at where follow_date = '0000-00-00 00:00:00';
#
# ALTER TABLE `hs_cerebral_stroke_leave_hospital_visit`
#     MODIFY COLUMN `follow_date` datetime(3) NOT NULL COMMENT '随访日期' AFTER `follow_way`;
#
# update hs_cerebral_stroke_visit stroke set follow_date = stroke.created_at where follow_date = '0000-00-00 00:00:00';
#
# ALTER TABLE `hs_cerebral_stroke_visit`
#     MODIFY COLUMN `follow_date` datetime(3) NOT NULL COMMENT '随访日期' AFTER `follow_way`;
```


```
val updateFields = Identity.forInsert(
            identityId
        ).apply {
            // 是否删除
            this.phone = null
            this.updatedAt = OffsetDateTime.now()
            this.updatedBy = AppSecurityUtil.currentUserId()
        }
        val updateResult = identityTable.update(updateFields)

```