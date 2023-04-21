```sql
select plan.kn_id,
       plan.kn_patient_id,
       plan.kn_name,
       plan.kn_sub_name,
       plan.kn_type,
       plan.kn_time,
       plan.is_monday,
       plan.is_tuesday,
       plan.is_wednesday,
       plan.is_thursday,
       plan.is_friday,
       plan.is_saturday,
       plan.is_sunday,
       plan.is_used,
       plan.kn_created_by,
       plan.kn_updated_by,
       plan.kn_updated_at,
       frequency.kn_id                  frequencyId,
       frequency.kn_explain_id          frequencyExplainId,
       frequency.kn_frequency_time      frequencyTime,
       frequency.kn_frequency_time_unit frequencyTimeUnit,
       frequency.kn_frequency_num       frequencyNum,
       frequency.kn_frequency_num_unit  frequencyNumUnit,
       frequency.kn_created_at          frequencyCreatedAt
from mr_health_plan plan
         left join mr_frequency frequency on plan.kn_id = frequency.kn_health_plan_id
WHERE plan.kn_patient_id = :patientId
  and plan.is_used = true
  and plan.is_del = false
```