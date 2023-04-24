# 排序
## 对象数组
- 排序数组
```json
[
  {
    "id": "1567798483648249856",
    "name": "地塞米松磷酸钠注射液",
    "type": "DRUG",
    "clockIn": false,
    "subName": "",
    "desc": "",
    "time": "14:24:00",
    "subFrequency": null
  },
  {
    "id": "1567798638619394048",
    "name": "阿莫西林",
    "type": "DRUG",
    "clockIn": false,
    "subName": "",
    "desc": "",
    "time": "15:00:00",
    "subFrequency": null
  },
  {
    "id": "1567798515491405824",
    "name": "足光散",
    "type": "DRUG",
    "clockIn": false,
    "subName": "",
    "desc": "",
    "time": "18:00:00",
    "subFrequency": null
  },
  {
    "id": "5211372833592850",
    "name": "有氧运动",
    "type": "HYPERTENSION_VISIT",
    "clockIn": false,
    "subName": "有用",
    "desc": "每周三天,每天2次",
    "time": null,
    "subFrequency": null
  },
  {
    "id": "1570697043083526144",
    "name": "血压",
    "type": "HYPERTENSION_VISIT",
    "clockIn": false,
    "time": null,
    "subFrequency": {
      "frequencyTime": 1,
      "frequencyTimeUnit": "DAYS",
      "frequencyNum": 2,
      "frequencyNumUnit": "SEQUENCE",
      "actualNum": 0
    }
  }
]
```
### sortedBy 按照某个字段排序
```
val todayClockResult2 = todayClockResult1
.sortedBy {
    if (it.type == HealthPlanType.DRUG) 1
    else {
        it.subFrequency?.let { _it ->
            if (_it.frequencyTimeUnit == TimeServiceUnit.DAYS && _it.frequencyTimeUnit == TimeServiceUnit.SEQUENCE)
                2
            else
                3
        }?: 4
    }
}
```
### sortedWith 按照两个字段排序
```
todayClockResult1
    .sortedWith { a, b ->
        if (a.type == HealthPlanType.DRUG && b.type != HealthPlanType.DRUG) {
            // a是DRUG,b不是DRUG, 1
            -1
        } else if (a.type != HealthPlanType.DRUG && b.type == HealthPlanType.DRUG) {
            // a不是DRUG,b是DRUG, -1
            1
        } else if (a.type == HealthPlanType.DRUG && b.type == HealthPlanType.DRUG) {
            // 都是DRUG, a.time.compare(b.time)
            a.time?.compareTo(b.time) ?: 0
        } else {
            // 都不是DRUG, a.createAt.compare(b.createAt)
            a.id.compareTo(b.id)
        }
    }
```