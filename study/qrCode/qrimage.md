#### 基于 qr-image 生成二维码
```javascript
import {imageSync} from 'qr-image';

export default class Test {
    //region 员工申请相关
    /**
    * 生成机构邀请码
    *
    * 格式: {area: ${area}}
    * @return 二维码地址
    */
    async invite() {
        const hospital = await getHospital();
        // 生成机构邀请码
        const imageBuffer = imageSync(
          JSON.stringify({
            code: hospital,
            name: Context.current.user.hospitals[0]['name']
          }),
          {type: 'png'}
        );
        return {
          image: `data:image/png;base64,${imageBuffer.toString('base64')}`
        };
    }



    // 获取二维码
    async getQRCode(id) {
      let token = Context.req.headers.token;
      if (id) {
        token = (await appDB.execute(`select id from staff where id = ?`, id))[0]
          ?.id;
        if (!token) throw new KatoRuntimeError(`员工不存在`);
      }
      // 生成微信二维码
      const imageBuffer = imageSync(
        JSON.stringify({
          code: token,
          type: id ? UserType.STAFF : null
        }),
        {type: 'png'}
      );
      return {
        image: `data:image/png;base64,${imageBuffer.toString('base64')}`
      };
    }
    // endregion
}
```