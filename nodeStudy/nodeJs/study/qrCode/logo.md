#### 生成一个带logo的二维码
```javascript
import {Context} from './context';
import {appDB} from '../app';
import {KatoRuntimeError} from 'kato-server';
import {imageSync} from 'qr-image';
import * as QRCode from 'qrcode';
import * as sharp from 'sharp';
import {UserType} from '../../common/user';
import * as path from 'path';
import * as fs from 'fs';

// exports.mergerCntImg = async (oriImg, waterImg, targetImg, ratio = 5) => {
//   const [ori, water] = await Promise.all([sharp(oriImg), sharp(waterImg)]);
//   // 通过比例进行合成
//   const oriHeight = await ori.metadata();
//   const waterHeight = Math.ceil(oriHeight.height / ratio);
//   const waterWidth = Math.ceil(oriHeight.width / ratio);
//   const waterBuffer = await water.resize(waterWidth, waterHeight).toBuffer();
//   // 合并图片的图片大小需要转成buffer，不能直接使用sharp对象，不然sharp也会报错
//   await ori.composite([{input: waterBuffer}]).toFile(targetImg);
// };
async function mergerCntImg(oriImg, waterImg, targetImg, ratio = 5) {
  const [ori, water] = await Promise.all([sharp(oriImg), sharp(waterImg)]);
  // 通过比例进行合成
  const oriHeight = await ori.metadata();
  const waterHeight = Math.ceil(oriHeight.height / ratio);
  const waterWidth = Math.ceil(oriHeight.width / ratio);
  const waterBuffer = await water.resize(waterWidth, waterHeight).toBuffer();
  // 合并图片的图片大小需要转成buffer，不能直接使用sharp对象，不然sharp也会报错
  await ori.composite([{input: waterBuffer}]).toFile(targetImg);
}

/**
 * 合并二维码和log,生成一个新的二维码
 *
 * @param qrBuffer 二维码的buffer
 * @param waterImg logo的地址
 * @param ratio
 */
async function mergerCntImg1(qrBuffer, waterImg, ratio = 5) {
  const waterImgBuffer = await fs.readFileSync(`${waterImg}`);

  const [ori, water] = await Promise.all([
    sharp(qrBuffer),
    sharp(waterImgBuffer)
  ]);
  // 通过比例进行合成
  const oriHeight = await ori.metadata();
  const waterHeight = Math.ceil(oriHeight.height / ratio);
  const waterWidth = Math.ceil(oriHeight.width / ratio);
  const waterBuffer = await water.resize(waterWidth, waterHeight).toBuffer();
  // 合并图片的图片大小需要转成buffer，不能直接使用sharp对象，不然sharp也会报错
  return await ori.composite([{input: waterBuffer}]).toBuffer();
}

export default class Test {
  async test(id) {
    let token = Context.req.headers.token;
    if (id) {
      token = (await appDB.execute(`select id from staff where id = ?`, id))[0]
        ?.id;
      if (!token) throw new KatoRuntimeError(`员工不存在`);
    }
    const content = JSON.stringify({
      code: token,
      type: id ? UserType.STAFF : null
    });

    const qrcodeName = `${token}${Date.now()}.png`;
    // 生成二维码地址
    const filePath = path.resolve(
      `/Users/wanghehui/projects/node/appraisal-server/tmp/qrcode/${qrcodeName}`
    );
    // 注意：这个地方一定要等待二维码先生成，才可以进行图片合并，不然使用哪个图片合并的库，都会报错
    await QRCode.toFile(filePath, content, {
      color: {
        dark: '#000000', // Blue dots
        light: '#0000' // Transparent background
      }
    });
    // 范围生成的二维码base64
    // const qrCodeImg = await QRCode.toDataURL(content);
    // 需要添加到二维码的logo
    const logo = path.resolve(
      '/Users/wanghehui/projects/node/appraisal-server/ui/assets/rank/first.png'
    );
    // 融合后的二维码地址
    const targetFilePath = path.resolve(
      `/Users/wanghehui/projects/node/appraisal-server/tmp/qrcode/test/${qrcodeName}`
    );
    // 融合二维码
    await mergerCntImg(filePath, logo, targetFilePath);
    // 创建文件可读流
    // const cs = fs.createReadStream(targetFilePath);
    const cs = fs.readFileSync(targetFilePath);

    // 把文件转为base64
    const imageBuffer = new Buffer(cs).toString('base64');
    // 删除掉生成的二维码文件
    fs.unlinkSync(filePath);
    fs.unlinkSync(targetFilePath);
    return {
      image: `data:image/png;base64,${imageBuffer.toString()}`
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

  /**
   * 生成机构邀请码
   *
   * 格式: {area: ${area}}
   * @return 二维码地址
   */
  async invite() {
    const hospital = await getHospital();

    // 生成二维码,返回二维码地址
    const qrCodeBuffer = imageSync(
      JSON.stringify({
        code: hospital,
        name: Context.current.user.hospitals[0]['name']
      }),
      {type: 'png'}
    );
    // 需要添加到二维码的logo
    const logo = path.resolve(path.join(__dirname, './first.png'));
    // 融合二维码和log
    const qrFile = await mergerCntImg1(qrCodeBuffer, logo);
    // 把文件转为base64
    const imageBuffer = new Buffer(qrFile).toString('base64');
    // 返回机构邀请码
    return {
      image: `data:image/png;base64,${imageBuffer.toString()}`
    };
  }

}

```