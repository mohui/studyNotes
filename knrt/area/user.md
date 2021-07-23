```javascript
export default class Group {

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
}
```