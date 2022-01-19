
在Mac上执行转PDF
```javascript
`wanghehuideMacBookPro:tmp wanghehui$ soffice --headless  --convert-to pdf ./皮肌炎.doc`

// 获取soffice路径
`wanghehuideMacBookPro:tmp wanghehui$ which soffice;`
```

```javascript
import {promises as fs} from 'fs';

import {exec as execCall} from 'child_process';
import * as util from 'util';

/**
 * util.promisify把原来的异步回调方法改成返回 Promise 实例的方法，
 * child_process  模块提供了衍生子进程的能力 创建子shell，可以直接执行shell管道命令，有回调
 */
const exec = util.promisify(execCall);

export default class Test {
  async test() {
    const dirPath = './tmp/wordToPdf';
    const subDirs = await fs.readdir(dirPath);
    // 循环最外层文件夹
    for (const dir of subDirs) {
      // 文件路径
      const filePath = `./tmp/wordToPdf/${dir}`;
      // 获取文件所在路径
      const files = await fs.readdir(filePath);
      // 循环文件所在路径
      for (const file of files) {
        try {
          const {stdout, stderr} = await exec(
            `/Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf --outdir ${filePath} ${filePath}/${file}`
          );
          // const {stdout, stderr} = await exec(`cd tmp; ls`);
          console.log('stdout:', stdout);
          console.log('stderr:', stderr);
        } catch (e) {
          //
          console.log(e.message);
        }
      }
    }
  }
}


```