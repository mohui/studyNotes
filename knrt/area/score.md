```javascript
import {AreaTreeNode, getLeaves, getOriginalArray} from '../group';

/**
 * 获取基础数据
 *
 * @param leaves code对应的所有叶子节点
 * @param tag 基础数据的tag
 * @param year 年份
 */
export async function getBasicData(
  leaves: AreaTreeNode[],
  tag: string,
  year: number
): Promise<number> {
  const data: number = await BasicTagDataModel.sum('value', {
    where: {
      hospital: {
        [Op.in]: leaves.filter(it => it.code.length === 36).map(it => it.code)
      },
      code: tag,
      year
    }
  });
  return data;
}
```

```javascript
export default class Score {
    async scoreArea(check, group, isAuto) {
  debug(`${check} ${group} 系统打分开始`);
  // 查询考核体系
  const checkModel: CheckSystemModel = await CheckSystemModel.findOne({
    where: {checkId: check}
  });
  if (!checkModel) throw new KatoRuntimeError(`考核体系 [${check}] 不合法`);
  // 考核年度
  const year = Number(checkModel.checkYear);
  debug('获取marks开始');
  const mark = await getMarks(group, year);
  debug('获取marks结束');
  const t = await appDB.transaction();
  try {
    debug(`打分年度: ${dayjs().year()}; 考核年度: ${year}`);
    await CheckAreaModel.findOne({
      where: {
        areaCode: group,
        checkId: check
      },
      transaction: t,
      lock: true
    });
    // 地区报告model
    const reportModel = {
      checkId: check,
      areaCode: group,
      workPoint: 0,
      totalWorkPoint: 0,
      correctWorkPoint: 0,
      score: 0,
      totalScore: 0,
      rate: 0
    };
    // 查询当前地区对应的叶子节点
    const leaves = await getLeaves(group);
    // 获取原始机构id数组
    const viewHospitals = await getOriginalArray(leaves.map(it => it.code));
    // 查询考核对象对应的考核体系的考核小项
    // language=PostgreSQL
    const parentRules: {id: string}[] = await appDB.execute(
      `
        select cr.rule_id as id
        from check_rule cr
        where cr.parent_rule_id is null
          and cr.check_id = ?`,
      check
    );
    // 根据考核小项, 进行打分
    for (const parentRule of parentRules) {
      debug('考核小项', parentRule.id, '开始');
      // 考核小项得分
      let parentScore = 0;
      // 考核小项满分
      let parentTotalScore = 0;
      // 根据考核小项查询考核细则
      // language=PostgreSQL
      const rules: {id: string; score: number}[] = await appDB.execute(
        `
          select rule_id as id, rule_score as score
          from check_rule
          where parent_rule_id = ?`,
        parentRule.id
      );
      for (const rule of rules) {
        debug('考核细则', rule.id, '开始');
        // 考核小项满分
        parentTotalScore += rule?.score ?? 0;
        // 考核细则得分
        // 查询rule_area_score
        let ruleAreaScoreModel: RuleAreaScoreModel = await RuleAreaScoreModel.findOne(
          {
            where: {ruleId: rule.id, areaCode: group}
          }
        );
        if (!ruleAreaScoreModel) {
          ruleAreaScoreModel = new RuleAreaScoreModel({
            ruleId: rule.id,
            areaCode: group,
            score: 0,
            auto: true,
            details: []
          });
        }
        // 考核细则是自动打分
        if (ruleAreaScoreModel.auto) {
          // 指标解释数组清空
          ruleAreaScoreModel.details = [];
          // 考核细则得分默认0, 重新计算
          ruleAreaScoreModel.score = 0;
          // 根据考核细则查询关联关系
          // language=PostgreSQL
          const formulas: {
            tag: string;
            algorithm: string;
            baseline: number;
            score: number;
            attachStartDate?: Date;
            attachEndDate?: Date;
          }[] = await appDB.execute(
            `
              select tag,
                     algorithm,
                     baseline,
                     score,
                     attach_start_date as "attachStartDate",
                     attach_end_date   as "attachEndDate"
              from rule_tag
              where rule = ?`,
            rule.id
          );
          // 根据关联关系计算得分
          for (const tagModel of formulas) {
            // 健康档案建档率
            if (tagModel.tag === MarkTagUsages.S01.code) {
              // 查询服务总人口数
              const basicData = await getBasicData(
                leaves,
                BasicTagUsages.DocPeople,
                year
              );
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.S01.name
                } = 建立电子健康档案人数 / 辖区内常住居民数 = ${
                  mark?.S00
                } / ${basicData} = ${percentString(mark?.S00, basicData)}`
              );
              // 根据指标算法, 计算得分
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.S00
              ) {
                ruleAreaScoreModel.score += tagModel.score;
              }
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.S00
              ) {
                ruleAreaScoreModel.score += tagModel.score;
              }
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.S00
              ) {
                const rate = mark?.S00 / basicData / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }

            // 健康档案规范率
            if (tagModel.tag === MarkTagUsages.S23.code) {
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.S23.name
                } = 规范的电子档案数 / 建立电子健康档案人数 = ${
                  mark?.S23
                } / ${mark?.S00} = ${percentString(mark?.S23, mark?.S00)}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.S23
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.S23
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.S23 &&
                mark?.S00
              ) {
                const rate = mark.S23 / mark.S00 / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }

            // 健康档案使用率
            if (tagModel.tag === MarkTagUsages.S03.code) {
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.S03.name
                } = 档案中有动态记录的档案份数 / 建立电子健康档案人数 = ${
                  mark?.S03
                } / ${mark?.S00} = ${percentString(mark?.S03, mark?.S00)}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.S03
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.S03
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.S03 &&
                mark?.S00
              ) {
                const rate = mark.S03 / mark.S00 / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }

            // 老年人健康管理率
            if (tagModel.tag === MarkTagUsages.O00.code) {
              // 查询老年人人数
              const basicData = await getBasicData(
                leaves,
                BasicTagUsages.OldPeople,
                year
              );
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.O00.name
                } = 年内接受老年人健康管理人数 / 辖区内65岁及以上常住居民数 = ${
                  mark?.O00
                } / ${basicData} = ${percentString(mark?.O00, basicData)}`
              );
              if (!basicData) continue;
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.O00
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.O00
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.O00
              ) {
                const rate = mark.O00 / basicData / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }
            // 老年人中医药健康管理率
            if (tagModel.tag === MarkTagUsages.O02.code) {
              // 查询老年人人数
              const basicData = await getBasicData(
                leaves,
                BasicTagUsages.OldPeople,
                year
              );
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.O02.name
                } = 年内接受中医药健康管理服务的65岁及以上居民数 / 年内接受健康管理的65岁及以上常住居民数 = ${
                  mark?.O02
                } / ${basicData} = ${percentString(mark?.O02, basicData)}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.O02
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.O02
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                basicData &&
                mark?.O02
              ) {
                const rate = mark.O02 / basicData / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }

            // 高血压健康管理
            if (tagModel.tag === MarkTagUsages.H00.code) {
              // 查询高血压人数
              const basicData = await getBasicData(
                leaves,
                BasicTagUsages.HypertensionPeople,
                year
              );
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.H00.name
                } = 一年内已管理的高血压患者数 / 年内辖区应管理高血压患者总数 = ${
                  mark?.H00
                } / ${basicData} = ${percentString(mark?.H00, basicData)}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.H00
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.H00
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.H00
              ) {
                const rate = mark.H00 / basicData / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }

            // 高血压规范管理率
            if (tagModel.tag === MarkTagUsages.H01.code) {
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.H01.name
                } = 按照规范要求进行高血压患者健康管理的人数 / 一年内已管理的高血压患者人数 = ${
                  mark?.H01
                } / ${mark?.H00} = ${percentString(mark?.H01, mark?.H00)}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.H01
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.H01
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.H00 &&
                mark?.H01
              ) {
                const rate = mark.H01 / mark.H00 / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }

            // 高血压控制率
            if (tagModel.tag === MarkTagUsages.H02.code) {
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.H02.name
                } = 一年内最近一次随访血压达标人数 / 一年内已管理的高血压患者人数 = ${
                  mark?.H02
                } / ${mark?.H00} = ${percentString(mark?.H02, mark?.H00)}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.H02
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.H02
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.H00 &&
                mark?.H02
              ) {
                const rate = mark.H02 / mark.H00 / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }

            // 糖尿病健康管理
            if (tagModel.tag === MarkTagUsages.D00.code) {
              // 查询糖尿病人数
              const basicData = await getBasicData(
                leaves,
                BasicTagUsages.DiabetesPeople,
                year
              );
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.D00.name
                } = 一年内已管理的2型糖尿病患者数 / 年内辖区2型糖尿病患者总数 x 100% = ${
                  mark?.D00
                } / ${basicData} = ${percentString(mark?.D00, basicData)}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.D00
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.D00
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.D00
              ) {
                const rate = mark.D00 / basicData / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }

            // 糖尿病规范管理率
            if (tagModel.tag === MarkTagUsages.D01.code) {
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.D01.name
                } = 按照规范要求进行2型糖尿病患者健康管理的人数 / 一年内已管理的2型糖尿病患者人数 x 100% = ${
                  mark?.D01
                } / ${mark?.D00} = ${percentString(mark?.D01, mark?.D00)}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.D01
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.D01
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.D00 &&
                mark?.D01
              ) {
                const rate = mark.D01 / mark.D00 / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }

            // 糖尿病控制率
            if (tagModel.tag === MarkTagUsages.D02.code) {
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.D02.name
                } = 一年内最近一次随访空腹血糖达标人数 / 一年内已管理的2型糖尿病患者人数 x 100% = ${
                  mark?.D02
                } / ${mark?.D00} = ${percentString(mark?.D02, mark?.D00)}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.D02
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.D02
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.D00 &&
                mark?.D02
              ) {
                const rate = mark.D02 / mark.D00 / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }
            // 定性指标得分
            if (tagModel.tag === MarkTagUsages.Attach.code) {
              // 添加指标解释数组
              ruleAreaScoreModel.details.push('请查看机构上传的资料');
              // 查询定性指标和机构表
              const attachModels = await RuleAreaAttachModel.findAll({
                where: {
                  ruleId: rule.id,
                  areaCode: group,
                  updatedAt: {
                    [Op.gt]: tagModel.attachStartDate,
                    [Op.lt]: tagModel.attachEndDate
                  }
                }
              });
              if (attachModels?.length > 0) {
                if (!tagModel?.baseline)
                  ruleAreaScoreModel.score += tagModel.score;

                // 有上传文件数量的要求
                if (tagModel?.baseline) {
                  const rate = attachModels.length / tagModel.baseline;
                  ruleAreaScoreModel.score +=
                    tagModel.score * (rate < 1 ? rate : 1);
                }
              }
            }

            // 健康教育指标 - 健康教育咨询次数合格率
            if (tagModel.tag === MarkTagUsages.HE09.code) {
              // 查询健康教育咨询的次数
              const basicData = await getBasicData(
                leaves,
                BasicTagUsages.HE09,
                year
              );
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.HE09.name
                } = 一年内举办健康教育咨询的次数 / 一年内应举办健康教育咨询的次数 x 100% = ${
                  mark?.HE09
                } / ${basicData} =  ${percentString(mark?.HE09, basicData)}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.HE09
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.HE09
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.HE09
              ) {
                const rate = mark.HE09 / basicData / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }
            // 健康教育指标 - 健康教育讲座次数合格率
            else if (tagModel.tag === MarkTagUsages.HE07.code) {
              // 查询健康知识讲座的次数
              const basicData = await getBasicData(
                leaves,
                BasicTagUsages.HE07,
                year
              );
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.HE07.name
                } = 一年内举办健康知识讲座的次数 / 一年内应举办健康知识讲座的次数 x 100% = ${
                  mark?.[tagModel.tag]
                } / ${basicData} =  ${percentString(mark?.HE07, basicData)}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.HE07
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.HE07
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.HE07
              ) {
                const rate = mark.HE07 / basicData / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }
            // 剩余健康教育指标
            else if (tagModel.tag.indexOf('HE') == 0) {
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${MarkTagUsages[tagModel.tag].name} = ${
                  mark?.[tagModel.tag]
                }`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.[tagModel.tag]
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.[tagModel.tag]
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.[tagModel.tag]
              ) {
                const rate = mark?.[tagModel.tag] / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }

            //卫生计生监督协管信息报告率
            if (tagModel.tag === MarkTagUsages.SC00.code) {
              const basicData = await getBasicData(
                leaves,
                BasicTagUsages.Supervision,
                year
              );
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${
                  MarkTagUsages.SC00.name
                } = 报告的事件或线索次数 / 发现的事件或线索次数 x 100% = ${
                  mark?.SC00
                } / ${basicData} = ${percentString(mark?.SC00, basicData)}`
              );

              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.SC00
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.SC00
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.SC00
              ) {
                const rate = mark.SC00 / basicData / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }

            //协助开展的实地巡查次数
            if (tagModel.tag === MarkTagUsages.SC01.code) {
              // 添加指标解释数组
              ruleAreaScoreModel.details.push(
                `${MarkTagUsages.SC01.name} = ${mark?.SC01}`
              );
              if (
                tagModel.algorithm === TagAlgorithmUsages.Y01.code &&
                mark?.SC01
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.N01.code &&
                !mark?.SC01
              )
                ruleAreaScoreModel.score += tagModel.score;
              if (
                tagModel.algorithm === TagAlgorithmUsages.egt.code &&
                mark?.SC01
              ) {
                const rate = mark?.SC01 / tagModel.baseline;
                ruleAreaScoreModel.score +=
                  tagModel.score * (rate > 1 ? 1 : rate);
              }
            }
          }
          // 如果未设置关联关系, 则得满分
          if (formulas?.length === 0) ruleAreaScoreModel.score = rule.score;
        }
        // 保存机构得分
        await ruleAreaScoreModel.save();
        // 考核小项得分
        parentScore += ruleAreaScoreModel.score;
        debug('考核细则', rule.id, '结束');
      }
      // 根据考核小项查询绑定的工分项
      const projects = (
        await appDB.execute(
          `select "projectId" as id from rule_project where rule = ?`,
          parentRule.id
        )
      ).map(it => it.id);
      let workPoint = 0;
      if (projects.length) {
        debug('考核小项获取参与校正工分开始');
        // 获取工分数组
        const scoreArray: {score: number}[] = await getWorkPoints(
          viewHospitals,
          projects,
          year
        );
        // 累计工分, 即参与校正工分值
        workPoint = scoreArray
          .reduce((prev, current) => {
            prev = prev.add(new Decimal(current.score));
            return prev;
          }, new Decimal(0))
          .toNumber();
        debug('考核小项获取参与校正工分结束', workPoint);
      } else {
        debug('考核小项未绑定工分项');
      }
      // 计算考核小项的质量系数
      let rate = 0;
      if (parentTotalScore != 0) {
        // 质量系数保留4位小数
        rate = Number(
          new Decimal(parentScore)
            .div(new Decimal(parentTotalScore))
            .toNumber()
            .toFixed(4)
        );
      }
      // 校正后的工分值, 默认为参与校正工分值
      let correctWorkPoint = workPoint;
      // 质量系数小于85%, 则使用质量系数校正
      if (rate < 0.85) {
        correctWorkPoint = new Decimal(workPoint)
          .mul(new Decimal(rate))
          .toNumber();
      }
      // 保存小项考核表
      await RuleAreaBudgetModel.upsert({
        ruleId: parentRule.id,
        areaCode: group,
        workPoint: workPoint,
        correctWorkPoint: correctWorkPoint,
        score: parentScore,
        totalScore: parentTotalScore,
        rate: rate
      });

      // 地区参与校正的工分
      reportModel.workPoint = new Decimal(workPoint)
        .add(new Decimal(reportModel.workPoint))
        .toNumber();
      // 地区校正后的工分
      reportModel.correctWorkPoint = new Decimal(reportModel.correctWorkPoint)
        .add(correctWorkPoint)
        .toNumber();
      // 地区考核得分
      reportModel.score = new Decimal(parentScore)
        .add(new Decimal(reportModel.score))
        .toNumber();
      // 地区考核满分
      reportModel.totalScore = new Decimal(parentTotalScore)
        .add(new Decimal(reportModel.totalScore))
        .toNumber();
      debug('考核小项', parentRule.id, '结束');
    }
    // 地区质量系数
    reportModel.rate =
      reportModel.totalScore === 0
        ? 0
        : new Decimal(reportModel.score)
            .div(new Decimal(reportModel.totalScore))
            .toNumber();
    debug('考核地区获取总工分开始');
    // 获取总工分数组
    const scoreArray: {score: number}[] = await getWorkPoints(
      viewHospitals,
      [],
      year
    );
    // 地区总工分
    reportModel.totalWorkPoint = scoreArray
      .reduce((prev, current) => {
        prev = prev.add(new Decimal(current.score));
        return prev;
      }, new Decimal(0))
      .toNumber();
    debug('考核地区获取总工分结束', reportModel);
    // 保存机构报告
    await ReportAreaModel.upsert(reportModel);
    // TODO: 历史功能暂时禁用 保存机构报告历史
    // await ReportAreaHistoryModel.upsert({
    //   ...reportModel,
    //   // 是考核年份且是自动打分, 则日期减一天, 因为算的是前一天的数据
    //   date: dayjs()
    //     .subtract(isCheckYear && isAuto ? 0 : 1, 'd')
    //     .toDate()
    // });
    await t.commit();
    debug(`${check} ${group} 系统打分结束`);
  } catch (e) {
    await t.rollback();
    debug(`${check} ${group} 系统打分异常: ${e}`);
    throw new KatoRuntimeError(e);
  }
}
}
```