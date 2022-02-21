## 导出Excel
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