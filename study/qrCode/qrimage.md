#### 基于 qr-image 生成二维码
```javascript
import {imageSync} from 'qr-image';

export default class Test {

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
}
```