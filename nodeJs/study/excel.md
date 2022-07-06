## 导出Excel
> 地址
https://github.com/exceljs/exceljs/blob/HEAD/README_zh.md#%E5%90%88%E5%B9%B6%E5%8D%95%E5%85%83%E6%A0%BC
```javascript
import {Workbook} from 'exceljs';

async function exportExcel() {
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

##### 导出备份
```javascript


async function excelBuffer2(month) {
    const buffer = (await excelBuffer(month)) as Buffer;
    //初始化文件挂载
    await initFS();
    //写入本地
    jobResult = `/manualExcel/${fileName}-${dayjs().format(
        'YYYY-MM-DDTHH:mm:ss'
    )}.xls`;
    await unifs.writeFile(jobResult, buffer);
}


async function excelBuffer3(month) {
    const fileName = '测试';
    const buffer = (await excelBuffer(month)) as Buffer;
    const jobResult = `/manualExcel/${fileName}-${dayjs().format(
        'YYYY-MM-DDTHH:mm:ss'
    )}.xls`;
    await unifs.writeFile(jobResult, buffer);
}
```