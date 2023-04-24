

```sql
select plan.kn_id,
       plan.kn_patient_id,
       plan.kn_name,
       frequency.kn_frequency_num       frequencyNum,
       frequency.kn_frequency_num_unit  frequencyNumUnit,
       frequency.kn_created_at          frequencyCreatedAt
from mr_health_plan plan
         left join mr_frequency frequency on plan.kn_id = frequency.kn_health_plan_id
WHERE plan.kn_patient_id = :patientId
  and plan.is_used = true
  and plan.is_del = false
```