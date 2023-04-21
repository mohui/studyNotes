```javascript
// 读取文件
const imageBuffer = await unifs.readFile('/qrcode/1.png');
// 写入文件
await unifs.writeFile('/qrcode/2.png', imageBuffer);
```