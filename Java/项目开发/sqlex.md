## 增
### 新增修改语句
```markdown
val result = table.saveOrUpdate(
            MrMedicationRemind(
                id,
                1.toBigInteger(),
                drugName,
                frequency,
                time,
                1,
                1.toBigInteger(),
                current,
                1.toBigInteger(),
                current
            )
        )
```
## 删

### 根据主键删除
```markdown
val result = table.deleteByKnId(id)
```

### 根据主见删除
```markdown
val result = table.deleteByKnId(id)
```
## 改
## 查

### 根据where条件查询
```markdown
val list = table.select().where(MrMedicationRemindTable.KnPatientId.eq(arg(1))).find()
```