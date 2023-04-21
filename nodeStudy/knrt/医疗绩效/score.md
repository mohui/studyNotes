```
/**
   * 自动手工打分 打前一天的手工分
   * @param day
   * @param staff
   * @constructor
   */
  @validate(
    should
      .date()
      .required()
      .description('时间'),
    should
      .string()
      .required()
      .description('考核员工id')
  )
  async autoManualScore(day, staff) {
    // 根据员工id查询出改员工是否有考核
    const staffSystem = await appDB.execute(
      `select staff, "check" from his_staff_check_mapping where staff = ?`,
      staff
    );
    if (staffSystem.length === 0) {
      log(`该员工无考核`);
      return;
    }

    // 根据员工id查询到的方案id查询方案
    const checkSystemModels = await appDB.execute(
      `select  id, name, hospital from his_check_system where id = ?`,
      staffSystem[0].check
    );

    if (checkSystemModels.length === 0) {
      log(`考核方案不存在`);
      return;
    }

    // 根据方案id查询考核细则
    const ruleModels = await appDB.execute(
      `select id, name, detail, auto, "check",
            metric, operator, value, score
           from his_check_rule
           where "check" = ?`,
      staffSystem[0].check
    );
    if (ruleModels.length === 0) {
      log(`考核方案没有细则`);
      return;
    }

    // 查询今天是否有分值
    let todayScore: {
      id: string;
      day: Date;
      assess: StaffAssessModel;
    } = (
      await appDB.execute(
        `select id, day, assess
           from his_staff_result
           where id = ? and day = ?`,
        staff,
        day
      )
    )[0];

    // 昨天的时间
    const yesterday = dayjs(day)
      .subtract(1, 'day')
      .toDate();
    // 查询昨天的分数
    const yesterdayScores: {
      id: string;
      day: Date;
      assess: StaffAssessModel;
    } = (
      await appDB.execute(
        `select id, day, assess
           from his_staff_result
           where id = ? and day = ?`,
        staff,
        yesterday
      )
    )[0];
    // 找出所有的昨天的手动打分
    const yesterdayAssess =
      yesterdayScores?.assess?.scores?.filter(
        yesterdayIt => yesterdayIt.auto === false
      ) ?? [];

    // 当前时间
    const nowDate = new Date();
    // 如果没有查询到, 说明还没有打过分,需要添加
    if (!todayScore) {
      const assessModelObj = await autoStaffAssess(
        ruleModels,
        'manual',
        todayScore?.assess
      );
      // 如果昨天的数据存在, 把昨天的手工分放到今天的手工分钟
      if (yesterdayAssess.length > 0) {
        for (const yesterdayIt of yesterdayAssess) {
          const index = assessModelObj?.ruleScores?.find(
            todayIt => todayIt.id === yesterdayIt.id
          );
          // 如果找到, 把昨天的分放到今天的数组中
          if (index) index.score = yesterdayIt.score;
        }
      }

      // 算出占比
      const rate = await staffScoreRate(assessModelObj?.ruleScores);

      todayScore = {
        // 员工id
        id: staff,
        day: day,
        assess: {
          id: checkSystemModels[0].id,
          name: checkSystemModels[0].name,
          scores: assessModelObj?.ruleScores,
          //质量系数
          rate: rate
        }
      };

      // 执行添加语句
      return await appDB.execute(
        `insert into
              his_staff_result(id, day, assess, created_at, updated_at)
              values(?, ?, ?, ?, ?)`,
        ...[
          todayScore.id,
          todayScore.day,
          JSON.stringify(todayScore.assess),
          nowDate,
          nowDate
        ]
      );
    } else {
      // 如果存在,有两种情况, 1: 考核方案的没有数据(工分有数据), 2: 考核方案有数据
      const assessModelObj = await autoStaffAssess(
        ruleModels,
        'manual',
        todayScore?.assess
      );

      // 算出占比
      const rate = await staffScoreRate(assessModelObj?.ruleScores);

      // 如果考核方案没有数据
      todayScore.assess = {
        id: checkSystemModels[0].id,
        name: checkSystemModels[0].name,
        scores: assessModelObj?.ruleScores,
        //质量系数
        rate: rate
      };
      // 执行修改语句
      return await appDB.execute(
        `
            update his_staff_result
              set assess = ?,
                updated_at = ?
            where id = ? and day = ?`,
        JSON.stringify(todayScore.assess),
        nowDate,
        staff,
        day
      );
    }
  }
```