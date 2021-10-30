# dayjs的基本应用
```javascript
// 当前时间
const now = new Date();

// 格式化年月日时分秒
const time = dayjs('2010-10-01').format('YYYY-MM-DD HH:mm:ss');
// 当前年
const year = dayjs().year();
// 一年的开始日期
const startYear = dayjs().startOf('year');
// 一年的结束日期
const endYear = dayjs().endOf('year');

// 年的开始时间 const year = 2020;
const yearStartDate = dayjs().year(year).startOf('y').toDate();
// 下一年的开始时间 const year = 2020;
const yearEndtDate = dayjs().year(year).startOf('y').add(1, 'y').toDate();


// 当天零点零分零秒
const nowStart = dayjs().startOf('day');
// 当天23点59分59秒
const nowEnd = dayjs().endOf('d');

// 一年已经过去了多少天 不连今天
const yearStartDay = current.diff(dayjs().startOf('year'), "day");
// 一年还剩余多少天
const yearEndDay = dayjs().endOf('year').diff(current, "day");
```

## 季度的用法
```javascript
// 引入季度的插件
import * as quarterOfYear from "dayjs/plugin/quarterOfYear"
dayjs.extend(quarterOfYear)
// 获取当前属于哪一个季度
const quarter = dayjs().quarter();
// 当前季度的结束时间
const currentQuarterEnd = dayjs().quarter(quarter).endOf('quarter');
// 当前季度剩余天数
const quarterEndDay = currentQuarterEnd.diff(current, "day") + 1;
```