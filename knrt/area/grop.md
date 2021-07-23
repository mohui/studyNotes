// src / api /group.ts
```javascript
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
}
```