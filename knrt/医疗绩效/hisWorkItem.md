```javascript
import {dayToRange, StaffWorkModel} from './his/service';
import {appDB, originalDB} from '../app';
import {
  HisStaffDeptType,
  HisStaffMethod,
  HisWorkMethod
} from '../../common/his';
import Decimal from 'decimal.js';
import {HisWorkItemSources} from './his/work_item';
import {sql as sqlRender} from '../database/template';
/**
 * 工分流水
 */
type WorkItemDetail = {
  //工分项id
  id: string;
  //工分项名称
  name: string;
  //工分项得分
  score: number;
};
export default class Test {
  async test(id, day) {
    const {start, end} = dayToRange(day);
    //查询员工信息
    const staffModel: {
      id: string;
      name: string;
      department?: string;
      hospital: string;
      staff?: string;
    } = (
      await appDB.execute(
        `select id, name, staff, hospital, department from staff where id = ?`,
        id
      )
    )[0];
    //员工不存在, 直接返回
    if (!staffModel) return;
    //查询绑定关系
    //language=PostgreSQL
    const bindings: {
      //工分项自身
      id: string; //工分项id
      name: string; //工分项名称
      method: string; //得分方式
      score: number; //分值
      //关联项目
      source: string; //关联项目id
      //关联员工
      staff_type: string; //关联人员类型
      staff_id: string; //关联人员id
      staff_level: string; //关联人员层级
      //绑定关系
      rate: string; //权重
    }[] = await appDB.execute(
      `
        select wi.id,
               wi.name,
               wi.method,
               wi.score,
               wim.source,
               wi.type                   as staff_type,
               wism.source               as staff_id,
               coalesce(wism.type, '员工') as staff_level,
               swim.rate
        from his_staff_work_item_mapping swim
               inner join his_work_item wi on swim.item = wi.id
               inner join his_work_item_mapping wim on swim.item = wim.item
               left join his_work_item_staff_mapping wism on swim.item = wism.item
        where swim.staff = ?
      `,
      staffModel.id
    );
    //查询得分结果
    //language=PostgreSQL
    let resultModel: StaffWorkModel = (
      await appDB.execute(
        `
          select work
          from his_staff_result
          where id = ?
            and day = ? for update
        `,
        id,
        day
      )
    )[0]?.work;
    if (!resultModel) {
      resultModel = {
        self: [],
        staffs: []
      };
    }

    // //工分流水
    let workItems: WorkItemDetail[] = [];
    //计算工分
    //region 计算CHECK和DRUG工分来源
    for (const param of bindings.filter(
      it => it.source.startsWith('门诊') || it.source.startsWith('住院')
    )) {
      //region 处理人员条件条件
      let staffCondition = '1 = 0';
      let staffValue = id;
      //员工关联是 固定且员工
      if (
        param.staff_type === HisStaffMethod.STATIC &&
        param.staff_level === HisStaffDeptType.Staff
      ) {
        staffValue = param.staff_id;
        staffCondition = 'id = ?';
      }
      //员工关联是 固定且科室
      if (
        param.staff_type === HisStaffMethod.STATIC &&
        param.staff_level === HisStaffDeptType.DEPT
      ) {
        staffValue = param.staff_id;
        staffCondition = 'department = ?';
      }
      //员工关联是 动态且员工
      if (
        staffModel.staff &&
        param.staff_type === HisStaffMethod.DYNAMIC &&
        param.staff_level === HisStaffDeptType.Staff
      ) {
        staffValue = staffModel.id;
        staffCondition = 'id = ?';
      }
      //员工关联是 动态且科室
      if (
        param.staff_type === HisStaffMethod.DYNAMIC &&
        param.staff_level === HisStaffDeptType.DEPT
      ) {
        //判断员工是否绑定科室
        if (staffModel.department) {
          staffValue = staffModel.department;
          staffCondition = 'department = ?';
        } else {
          //未绑定科室, 则使用本人
          staffValue = staffModel.id;
          staffCondition = 'id = ?';
        }
      }
      let doctorCondition = '1 = 0';
      //员工关联是 动态且机构
      if (
        param.staff_type === HisStaffMethod.DYNAMIC &&
        param.staff_level === HisStaffDeptType.HOSPITAL
      ) {
        doctorCondition = '1 = 1';
      }
      const doctorValue: string[] = (
        await appDB.execute(
          `select staff from staff where staff is not null and ${staffCondition}`,
          staffValue
        )
      ).map(it => it.staff);
      if (doctorValue.length > 0) {
        doctorCondition = `d.doctor in (${doctorValue.map(() => '?').join()})`;
      }
      //endregion
      //查询his的收费项目
      const rows: {
        value: string;
        date: Date;
      }[] = await originalDB.execute(
        // language=PostgreSQL
        `
          select d.total_price as value, d.operate_time as date
          from his_charge_detail d
                 inner join his_charge_master m on d.main = m.id
          where m.hospital = ?
            and d.operate_time > ?
            and d.operate_time < ?
            and (d.item like ? or d.item = ?)
            and ${doctorCondition}
          order by d.operate_time
        `,
        staffModel.hospital,
        start,
        end,
        `${param.source}.%`,
        param.source,
        ...doctorValue
      );
      //his收费项目流水转换成工分流水
      workItems = workItems.concat(
        rows.map<WorkItemDetail>(it => {
          let score = 0;
          //SUM得分方式
          if (param.method === HisWorkMethod.SUM) {
            score = new Decimal(it.value).mul(param.score).toNumber();
          }
          //AMOUNT得分方式
          if (param.method === HisWorkMethod.AMOUNT) {
            score = param.score;
          }
          //权重系数
          score = new Decimal(score).mul(param.rate).toNumber();
          return {
            id: param.id,
            name: param.name,
            score: score
          };
        })
      );
    }
    //endregion
    //region 计算MANUAL工分来源
    for (const param of bindings.filter(it =>
      it.source.startsWith('手工数据')
    )) {
      //region 处理人员条件条件
      let staffCondition = '1 = 0';
      let staffValue = id;
      //员工关联是 固定且员工
      if (
        param.staff_type === HisStaffMethod.STATIC &&
        param.staff_level === HisStaffDeptType.Staff
      ) {
        staffValue = param.staff_id;
        staffCondition = 's.id = ?';
      }
      //员工关联是 固定且科室
      if (
        param.staff_type === HisStaffMethod.STATIC &&
        param.staff_level === HisStaffDeptType.DEPT
      ) {
        staffValue = param.staff_id;
        staffCondition = 's.department = ?';
      }
      //员工关联是 动态且员工
      if (
        param.staff_type === HisStaffMethod.DYNAMIC &&
        param.staff_level === HisStaffDeptType.Staff
      ) {
        staffValue = staffModel.id;
        staffCondition = 's.id = ?';
      }
      //员工关联是 动态且科室
      if (
        param.staff_type === HisStaffMethod.DYNAMIC &&
        param.staff_level === HisStaffDeptType.DEPT
      ) {
        //判断员工是否绑定科室
        if (staffModel.department) {
          staffValue = staffModel.department;
          staffCondition = 's.department = ?';
        } else {
          //未绑定科室, 则使用本人
          staffValue = staffModel.id;
          staffCondition = 's.id = ?';
        }
      }
      //员工关联是 动态且机构
      if (
        param.staff_type === HisStaffMethod.DYNAMIC &&
        param.staff_level === HisStaffDeptType.HOSPITAL
      ) {
        staffValue = staffModel.hospital;
        staffCondition = 's.hospital = ?';
      }
      //endregion
      //查询手工数据流水表
      const rows: {date: Date; value: number}[] = await appDB.execute(
        // language=PostgreSQL
        `
          select date, value
          from his_staff_manual_data_detail smdd
                 inner join staff s on s.id = smdd.staff
          where smdd.item = ?
            and smdd.date >= ?
            and smdd.date < ?
            and ${staffCondition}
        `,
        //手工数据的source转id, 默认是只能必须选id
        param.source.split('.')[1],
        start,
        end,
        staffValue
      );
      //手工数据流水转换成工分流水
      workItems = workItems.concat(
        rows.map<WorkItemDetail>(it => {
          let score = 0;
          //SUM得分方式
          if (param.method === HisWorkMethod.SUM) {
            score = new Decimal(it.value).mul(param.score).toNumber();
          }
          //AMOUNT得分方式
          if (param.method === HisWorkMethod.AMOUNT) {
            score = param.score;
          }
          //权重系数
          score = new Decimal(score).mul(param.rate).toNumber();
          return {
            id: param.id,
            name: param.name,
            score: score
          };
        })
      );
      //endregion
    }
    //endregion
    //region 计算公卫数据工分来源
    for (const param of bindings.filter(it =>
      it.source.startsWith('公卫数据')
    )) {
      //机构级别的数据, 直接用当前员工的机构id即可
      //查询hospital绑定关系
      // language=PostgreSQL
      const hisHospitals: string[] = (
        await appDB.execute(
          `
            select hishospid hospital
            from hospital_mapping
            where h_id = ?
          `,
          staffModel.hospital
        )
      ).map(it => it.hospital);
      //没有绑定关系, 直接跳过
      if (hisHospitals.length === 0) continue;
      const item = HisWorkItemSources.find(it => it.id === param.source);
      //未配置数据表, 直接跳过
      if (!item || !item?.datasource?.table) continue;
      //渲染sql
      const sqlRendResult = sqlRender(
        `
select 1 as value, {{dateCol}} as date
from {{table}}
where 1 = 1
  and {{dateCol}} >= {{? start}}
  and {{dateCol}} < {{? end}}
  and OperateOrganization in ({{#each hospitals}}{{? this}}{{#sep}},{{/sep}}{{/each}})
{{#each columns}} and {{this}} {{/each}}`,
        {
          dateCol: item.datasource.date,
          hospitals: hisHospitals,
          table: item.datasource.table,
          columns: item.datasource.columns,
          start,
          end
        }
      );
      const rows: {date: Date; value: number}[] = await originalDB.execute(
        sqlRendResult[0],
        ...sqlRendResult[1]
      );
      //公卫数据流水转换成工分流水
      workItems = workItems.concat(
        rows.map<WorkItemDetail>(it => {
          let score = 0;
          //SUM得分方式
          if (param.method === HisWorkMethod.SUM) {
            score = new Decimal(it.value).mul(param.score).toNumber();
          }
          //AMOUNT得分方式
          if (param.method === HisWorkMethod.AMOUNT) {
            score = param.score;
          }
          //权重系数
          score = new Decimal(score).mul(param.rate).toNumber();
          return {
            id: param.id,
            name: param.name,
            score: score
          };
        })
      );
    }
    //endregion
    //region 计算其他工分来源
    for (const param of bindings.filter(it => it.source.startsWith('其他'))) {
      let type = '';
      if (param.source === '其他.住院诊疗人次') type = '住院';
      if (param.source === '其他.门诊诊疗人次') type = '门诊';
      console.log({a: staffModel.hospital, start, end, type});
      const rows: {date: Date; value: number}[] = (
        await originalDB.execute(
          // language=PostgreSQL
          `
            select distinct treat

            from his_charge_master
            where hospital = ?
              and operate_time >= ?
              and operate_time < ?
              and charge_type = ?
          `,
          staffModel.hospital,
          start,
          end,
          type
        )
      ).map(() => ({
        value: 1,
        date: day
      }));
      //其他工分流水转换成工分流水
      workItems = workItems.concat(
        rows.map<WorkItemDetail>(it => {
          let score = 0;
          //SUM得分方式
          if (param.method === HisWorkMethod.SUM) {
            score = new Decimal(it.value).mul(param.score).toNumber();
          }
          //AMOUNT得分方式
          if (param.method === HisWorkMethod.AMOUNT) {
            score = param.score;
          }
          //权重系数
          score = new Decimal(score).mul(param.rate).toNumber();
          return {
            id: param.id,
            name: param.name,
            score: score
          };
        })
      );
    }
    //endregion
    //region 写入结果表
    //累加流水
    resultModel.self = workItems.reduce((result, current) => {
      const obj = result.find(it => it.id === current.id);
      if (obj) {
        obj.score = new Decimal(obj.score).add(current.score).toNumber();
      } else {
        result.push({
          id: current.id,
          name: current.name,
          score: current.score
        });
      }
      return result;
    }, []);
    //补充没有得分的工分项
    for (const param of bindings) {
      const obj = resultModel.self.find(it => it.id === param.id);
      if (!obj) {
        resultModel.self.push({
          id: param.id,
          name: param.name,
          score: 0
        });
      }
    }
    return resultModel;
    //TODO: 兼容老设计, 等待确认完删除
    resultModel.staffs = [];
    const resultValue = JSON.stringify(resultModel);
    await appDB.execute(
      //language=PostgreSQL
      `
        insert into his_staff_result(id, day, work)
        values (?, ?, ?)
        on conflict (id, day)
          do update set work       = ?,
                        updated_at = now()
      `,
      id,
      day,
      resultValue,
      resultValue
    );
    //endregion
  }
}

```