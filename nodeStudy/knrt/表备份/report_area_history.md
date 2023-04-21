## 删除了report_area_history 表model引起的一些后果
>删除了 SystemArea.history接口
```javascript
export default class SystemArea {
  /**
   * 历史记录
   *
   * @param code
   * @param year
   */
  @validate(
    should
      .string()
      .required()
      .description('地区code或机构id'),
    should
      .number()
      .allow(null)
      .description('年份')
  )
  async history(code, year) {
    // 查询本级权限
    const areas = (
      await originalDB.execute(
        // language=PostgreSQL
        `
        select code, name
        from area
        where code = ?
      `,
        code
      )
    )[0];

    if (!areas) throw new KatoCommonError(`地区 ${code} 不合法`);
    // 如果没有传年份获取年份
    year = getYear(year);

    // 通过地区编码和时间获取checkId
    const checkId = await yearGetCheckId(code, year);
    if (!checkId) return [];

    // 查询考核体系
    return ReportAreaHistoryModel.findAll({
      order: [['date', 'asc']],
      where: {
        areaCode: code,
        checkId,
        date: {
          [Op.gte]: dayjs()
            .year(year)
            .startOf('y')
            .toDate(),
          [Op.lt]: dayjs()
            .year(year)
            .startOf('y')
            .add(1, 'y')
            .toDate()
        }
      },
      attributes: ['date', 'workPoint', 'totalWorkPoint', 'rate', 'score']
    });
  }
}
```
>删除了CheckAreaEdit.editArea接口的一段代码
```javascript
export default class CheckAreaEdit {
    async editArea() {
    
        //删除机构的打分结果
        await ReportAreaModel.destroy({
          where: {
            areaCode: {[Op.in]: deleteAreas}
          }
        });
        [代码下面]

      //删除解绑结构的今日历史打分结果
      await ReportAreaHistoryModel.destroy({
        where: {
          areaCode: {[Op.in]: deleteAreas},
          date: dayjs().toDate(),
          checkId
        }
      })
   }
}
```



```javascript
import {
  AllowNull,
  Column,
  Comment,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

@Table({tableName: 'report_area_history'})

export class ReportAreaHistory extends Model<ReportAreaHistory> {
  @Comment('日期')
  @PrimaryKey
  @Column({field: 'date', type: DataType.DATE})
  date: Date;

  @Comment('考核id')
  @PrimaryKey
  @Column({field: 'check', type: DataType.UUID})
  checkId: string;

  @Comment('地区code')
  @PrimaryKey
  @Column({field: 'area'})
  areaCode: string;

  @Comment('参与校正的工分值')
  @Default(0)
  @Column({field: 'workPoint', type: DataType.FLOAT})
  workPoint: number;

  @Comment('校正前的工分值')
  @Default(0)
  @Column({field: 'totalWorkPoint', type: DataType.FLOAT})
  totalWorkPoint: number;

  @Comment('得分')
  @Default(0)
  @Column(DataType.FLOAT)
  score: number;

  @Comment('质量系数')
  @AllowNull(false)
  @Default(0)
  @Column(DataType.FLOAT)
  rate: number;

  @Comment('分配金额')
  @AllowNull(false)
  @Default(0)
  @Column(DataType.DECIMAL(15, 4))
  budget: number;
}
```