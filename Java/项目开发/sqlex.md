## 增
### 新增修改语句
```
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
### 新增必填和非必填的用法
```

dpmPatientInfoTable.save(
    DpmPatientInfo.forInsert(
        BigInteger.valueOf(11111),
        "t2",
        "MAN",
        "123",
        LocalDateTimeUtil.parse("2002-07-15T00:00:00"),
        "123",
        BigInteger.ONE,
        BigInteger.ONE,
        BigInteger.ONE
    ).apply {
        this.knHypertensionDiseaseTag = "HIGH"
        this.knDiabetesDiseaseTag = "LOW"
        this.knCerebralStrokeDiseaseTag = "HIGH"
    }
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

### 修改单个字段
```markdown
table
    .update()
    .setKnStatus(status)
    .where(MrMedicationRemindTable.KnId.eq(arg(updStatusParams.id)))
    .execute()
```
## 查

### 根据where条件查询
```markdown
val list = table.select().where(MrMedicationRemindTable.KnPatientId.eq(arg(1))).find()
```
### 根据不同条件where查询
```markdown
val remindList = table
    .select()
    .where(MrMedicationRemindTable.KnPatientId.eq(arg(parentId)))
    .where(MrMedicationRemindTable.KnStatus eq arg(BooleanIntEnum.TRUE.value))
    .where(MrMedicationRemindTable.KnTime gte arg(start))
    .where(MrMedicationRemindTable.KnTime lte arg(end))
    .filter {
        if (week == "MONDAY") {
            (MrMedicationRemindTable.KnMonday eq BooleanIntEnum.TRUE.value)
        } else if (week == "TUESDAY") {
            (MrMedicationRemindTable.KnMonday eq BooleanIntEnum.TRUE.value)
        } else if (week == "WEDNESDAY") {
            (MrMedicationRemindTable.KnWednesday eq BooleanIntEnum.TRUE.value)
        } else if (week == "THURSDAY") {
            (MrMedicationRemindTable.KnThursday eq BooleanIntEnum.TRUE.value)
        } else if (week == "FRIDAY") {
            (MrMedicationRemindTable.KnFriday eq BooleanIntEnum.TRUE.value)
        } else if (week == "SATURDAY") {
            (MrMedicationRemindTable.KnSaturday eq BooleanIntEnum.TRUE.value)
        } else {
            (MrMedicationRemindTable.KnSunday eq BooleanIntEnum.TRUE.value)
        }
    }
    .find()
```