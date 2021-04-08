# dayjs的基本应用
```javascript
// 当前年
const year = dayjs().year();
// 一年的开始日期
const startYear = dayjs().startOf('year');
// 一年的结束日期
const endYear = dayjs().endOf('year');

// 当前时间
const current = dayjs().startOf('day');
// 一年已经过去了多少天 不连今天
const yearStartDay = current.diff(dayjs().startOf('year'), "day");
// 一年还剩余多少天
const yearEndDay = dayjs().endOf('year').diff(current, "day");
```