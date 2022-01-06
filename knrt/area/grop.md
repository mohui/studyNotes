// src / api /group.ts
```javascript
import HisStaff from '../his/staff';

export default class Group {
    /**
     * 获取当前code的子级
     *
     * @param code 地区code
     */
    async children(code) {
        if (!code) {
            code = Context.current.user.code;
        }
        return AreaModel.findAll({where: {parent: code}});
    }
    async staffCheck(params) {
        // 实例化hisStaff接口
        const staffApi = new HisStaff();
        // 获取员工公分项详情
        return await staffApi.staffCheck(params.id, params.month, params.hospital);
      }

}
```