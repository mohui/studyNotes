### hospital.ts
```javascript
import {HospitalModel, RegionModel, sql as sqlRender} from '../database';
import {KatoCommonError, should, validate} from 'kato-server';
import {Projects} from '../../common/project';

export default class Hospital {
  async workpoints(code) {
    const hospitalMapping = await appDB.execute(
      `select hishospid as id
            from hospital_mapping mapping
            where h_id = ?`,
      code
    );

    // 查询所属his
    const hospital = await HospitalModel.findOne({
      where: {id: code}
    });
    if (!hospital) throw new KatoCommonError(`code为 ${code} 的机构不存在`);

    const hisHospitalId = hospitalMapping[0]?.id;
    const type = hospital?.his;

    return (
      await originalDB.execute(
        `select cast(sum(vws.score) as int) as score,
              vws.operatorid as doctorId,
              vws.doctor as doctorName,
              vws.projecttype as "projectId"
           from view_workscoretotal vws
           where vws.operateorganization = ?
             and missiontime >= ?
             and missiontime < ?
         group by vws.operatorid, vws.doctor,vws.projecttype`,
        hisHospitalId,
        dayjs()
          .startOf('y')
          .toDate(),
        dayjs()
          .startOf('y')
          .add(1, 'y')
          .toDate()
      )
    ).map(it => ({
      ...it,
      name: Projects.find(p => {
        return p.mappings.find(
          mapping => mapping.id === it.projectId && mapping.type === type
        );
      })?.name
    }));
  }

  @validate(
    should
      .string()
      .required()
      .description('父级机构的id')
  )
  async list(parent) {
    return HospitalModel.findAll({
      attributes: {
        exclude: ['deleted_at']
      },
      where: {parent},
      paranoid: false,
      include: {
        model: RegionModel,
        paranoid: false,
        attributes: {
          exclude: ['deleted_at']
        }
      }
    });
  }

  /***
   * 机构信息
   * @param id
   */
  async info(id) {
    return HospitalModel.findOne({where: {id}});
  }
}
```

### systemArea
```javascript
import {getAreaTree, getOriginalArray} from './group';
import {KatoCommonError} from 'kato-server';
import {sql as sqlRender} from '../database/template';
import {originalDB} from '../app';
import {getYear} from './group/system_area';

export default class systemArea {
  async workPointsArea(code, year) {
    // 获取树形结构
    const tree = await getAreaTree(code);

    // 权限的下级子节点
    let childrenTree = [];
    // 如果没有查到子节点,可能是机构节点,判断机构节点是否合法
    if (tree.length === 0)
      throw new KatoCommonError(`code 为 ${code} 的地区不存在`);
    else if (tree.length > 1) {
      // 非机构权限, 列表为下级权限 => 找到自己的子节点
      childrenTree = tree
        .map(it => {
          if (it.parent === code) return it;
        })
        .filter(item => item);
    }
    // 找到所有的叶子节点
    const hospitalIds = tree.filter(it => it.leaf === true);

    // 根据机构id获取对应的原始数据id
    const hisHospIdObjs = await getOriginalArray(
      hospitalIds.map(item => item.code)
    );

    const hisHospIds = hisHospIdObjs.map(it => it['id']);

    // 根据地区id获取机构id列表
    if (hisHospIds.length < 1) throw new KatoCommonError('机构id不合法');

    // 如果没有传年份获取年份,默认当前年
    year = getYear(year);

    const [sql, params] = sqlRender(
      `
            select
                cast(sum(score) as int) as score,
                operateorganization,
                operatorid as "doctorId",
                doctor as "doctorName"
            from mark_workpoint
            where operateorganization in ({{#each hisHospIds}}{{? this}}{{#sep}},{{/sep}}{{/ each}})
             and year = {{? year}}
             group by operatorid, doctor, operateorganization
             `,
      {
        hisHospIds,
        year
      }
    );

    // 执行SQL语句
    const workPoint = await originalDB.execute(sql, ...params);
    // 如果是机构级节点, 返回查询结果
    if (childrenTree.length === 0) {
      return workPoint.map(it => {
        return {
          code: it.doctorId,
          name: it.doctorName,
          score: it.score,
          isDoctor: true
        };
      });
    }

    // 如果是机构节点之前, 把机构id赋值给查询结果
    const hospitalWorkPoint = workPoint
      .map(it => {
        const hospitalIdObj = hisHospIdObjs.find(
          item => item.id === it.operateorganization
        );
        return {
          ...it,
          hospitalId: hospitalIdObj.code
        };
      })
      .map(it => {
        const index = hospitalIds.find(item => item.code === it.hospitalId);
        return {
          ...it,
          path: index.path
        };
      })
      .map(it => {
        const index = childrenTree.find(item =>
          it.path.find(p => p === item.code)
        );
        return {
          ...it,
          parentCode: index.code,
          parentName: index.name
        };
      });

    const returnPoint = [];
    for (const it of hospitalWorkPoint) {
      const index = returnPoint.find(item => item.code === it.parentCode);
      if (index) {
        index.score += it.score;
      } else {
        returnPoint.push({
          code: it.parentCode,
          name: it.parentName,
          score: it.score
        });
      }
    }

    return returnPoint;
  }
}
```

### score
```javascript

```