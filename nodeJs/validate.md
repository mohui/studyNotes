# 参数校验中间件
```javascript
import {should, validate} from 'kato-server';

export default class Test {
  @validate(
    // 对象的校验 param = {code: []}
    should.object({
      code: should.array().allow(null)
    }),
    // 数组校验
    should
      .array()
      .required()
      .description('数组'),
    // 对象数组必须有哪些元素
    should
      .array()
      .items({
        auto: should
          .boolean()
          .required()
          .description('bool类型'),
        name: should
          .string()
          .required()
          .description('字符串类型'),
        score: should
          .number()
          .required()
          .description('数字类型'),
      type: should
        .string()
        .only(HisWorkSource.CHECK, HisWorkSource.DRUG, HisWorkSource.MANUAL)
        .description('只能传: 检查项目/药品/手工数据')
      })
      .required()
      .description('对象数组类型'),
    // 字符串校验,必传
    should
      .string()
      .required()
      .description('字符串'),
    // 时间校验
    should.date().required()
  )
  test(param) {
    
    return new Date();
  }
  @validate(
    should
      .object({
        id: should.string().required(),
        areas: should
          .array()
          .items({
            hospital: should.string().required(),
            department: should.string().allow(null)
          })
          .allow(null)
      })
      .required()
  )
 test1(){
    return 12;
 }

}
```




