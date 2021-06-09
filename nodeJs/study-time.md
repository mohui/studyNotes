```javascript
// 当前时间
const now = new Date();
// 当天零点零分零秒
const nowStart = dayjs().startOf('d');
// 当天23点59分59秒
const nowEnd = dayjs().endOf('d');

// 格式化时间年月日
const time = dayjs('2010-10-01').format('YYYYMMDD');
// 格式化年月日时分秒
const time = dayjs('2010-10-01').format('YYYY-MM-DD HH:mm:ss');
```