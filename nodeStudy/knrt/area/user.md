```javascript
export default class User {
  async login(account, password) {
    let user = await UserModel.findOne({
      where: {account, password},
      include: [RoleModel, RegionModel]
    });
    //是否查询出结果
    if (!user) throw new KatoLogicError('账户密码有误', 1002);
    return user;
  }


  async addUser(user) {
    return appDB.transaction(async () => {
      //查询该账户是否存在
      const result = await UserModel.findOne({where: {account: user.account}});
      if (result) throw new KatoCommonError('该账户已存在');
      //操作者id
      const currentId = Context.current.user.id;
      const newUser = await UserModel.create({
        ...user,
        creatorId: currentId,
        editorId: currentId
      });
      //绑定角色关系
      const roleUser = user.roles.map(roleId => ({
        userId: newUser.id,
        roleId: roleId
      }));
      //批量设置用户角色关系
      await UserRoleModel.bulkCreate(roleUser);

      // 兼容老代码
      newUser.regionId = user.areaCode;
      const regionModel = await RegionModel.findOne({
        where: {code: newUser.areaCode}
      });
      if (regionModel) {
        newUser.regionId = newUser.areaCode;
      } else {
        const hospitalModel = await HospitalModel.findOne({
          where: {id: newUser.areaCode}
        });
        if (hospitalModel) {
          newUser.regionId = hospitalModel.regionId;
          await UserHospitalModel.create({
            hospitalId: hospitalModel.id,
            userId: newUser.id
          });
        } else {
          // 中心层, 既不是区划, 也不是机构
          const hospitalRegions = await appDB.execute(
            `select h.region from hospital_mapping hm inner join hospital h on hm.h_id = h.id where u_id = ?`,
            newUser.areaCode
          );
          if (hospitalRegions.length === 1) {
            newUser.regionId = hospitalRegions[0].region;
          }
        }
      }
      await newUser.save();

      return newUser;
    });
  }
  
  update(user) {
      return appDB.joinTx(async () => {
        //查询用户,并锁定
        let userModel = await UserModel.findOne({
          where: {id: user.id},
          lock: true
        });
        if (!userModel) throw new KatoCommonError('该用户不存在');
        //查询该用户所有的角色
        const roleList = await UserRoleModel.findAll({
          where: {userId: user.id},
          lock: true
        });
        //删除解除的角色关系
        await Promise.all(
          roleList
            .filter(it => !user.roles.includes(it.roleId)) //筛选出需要解除的role
            .map(async item => await item.destroy({force: true}))
        );
        //添加新的角色关系
        await UserRoleModel.bulkCreate(
          user.roles
            .filter(id => !roleList.find(role => role.roleId === id)) //筛选出需要新增的role
            .map(roleId => ({userId: user.id, roleId: roleId}))
        );
        //修改操作
        user.editorId = Context.current.user.id;
  
        // 兼容老代码
        await UserHospitalModel.destroy({where: {userId: user.id}});
        user.regionId = user.areaCode;
        const regionModel = await RegionModel.findOne({
          where: {code: user.areaCode}
        });
        if (regionModel) {
          user.regionId = user.areaCode;
        } else {
          const hospitalModel = await HospitalModel.findOne({
            where: {id: user.areaCode}
          });
          if (hospitalModel) {
            user.regionId = hospitalModel.regionId;
            await UserHospitalModel.create({
              hospitalId: hospitalModel.id,
              userId: user.id
            });
          } else {
            // 中心层, 既不是区划, 也不是机构
            const hospitalRegions = await appDB.execute(
              `select h.region from hospital_mapping hm inner join hospital h on hm.h_id = h.id where u_id = ?`,
              user.areaCode
            );
            if (hospitalRegions.length === 1) {
              user.regionId = hospitalRegions[0].region;
            }
          }
        }
        await UserModel.update(user, {where: {id: user.id}});
      });
    }

}
```