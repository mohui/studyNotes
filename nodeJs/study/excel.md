## 导出Excel
> 地址
https://github.com/exceljs/exceljs/blob/HEAD/README_zh.md#%E5%90%88%E5%B9%B6%E5%8D%95%E5%85%83%E6%A0%BC
```javascript
import {Workbook} from 'exceljs';

async function exportExcel() {
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet(`导出sheet名称`);
    // 定义第一行的内容数组[小项标题]
    const firstRow = ['', '合计', '', ''];
    // 定义第二行的内容数组[细则标题]
    const secondRow = ['', '校正前总工分', '校正后总工分', '总金额'];
    workSheet.addRows([firstRow, secondRow]);
    // 合并单元格 A1,A2
    workSheet.mergeCells('A1', 'A2');
    // 合并单元格 B1,C1,D1
    workSheet.mergeCells('B1', 'D1');
    return workBook.xlsx.writeBuffer();
}
```

## 导出
- 特别注意,需要在配置文件development中配置路径
```ts
module.exports = {
    unifs: [
        {
            path: '/ev', // 文件上传
            type: 'local',
            options: {
                base: '/Users/wanghehui/projects/node/appraisal-server/tmp/ev',
                external: {
                    baseUrl: 'http://127.0.0.1:3000',
                    prefix: '/ev',
                    key: 'default'
                }
            }
        }
    ]
}
```
```javascript
import * as Excel from 'exceljs';


async function excelBuffer(month) {
    const workBook = new Excel.Workbook();
    const workSheet = workBook.addWorksheet(`人员档案表格...`);
    //添加标题
    workSheet.addRow([
        '机构名称',
        '总分',
        '身份证号',
        '住址',
        '性别',
        '电话',
        '人群分类',
        '档案问题'
    ]);
    const fileName = '测试测试.xls';
    return workBook.xlsx.writeBuffer();
}

export default class Evaluation {
    async exportResult(year, area) {
        const buffer = (await excelBuffer(year, area)) as Buffer;
        const jobResult = `/ev/测试1.xls`;
        await unifs.writeFile(jobResult, buffer);
    }
}
```