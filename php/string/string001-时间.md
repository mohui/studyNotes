#### 设置时区
mktime(hour,minute,second,month,day,year,is_dst);
参数
hour    可选。规定小时。
minute	可选。规定分。
second	可选。规定秒。
month	可选。规定月。
day		可选。规定天。
is_dst	可选。如果时间在夏令时 (DST) 期间，则设置为 1，否则设置为 0，若未知则设置为 -1（默认）。
如果未知，PHP 会自己进行查找（可能产生意外的结果）。
注意：该参数在 PHP 5.1.0 中被废弃。取而代之使用的是新的时区处理特性。

php判断某日期是哪一年的第几周
echo date('W',strtotime('2016-10-10'));
W 是大写

设置时区
date_default_timezone_set

时间戳转化为年-月-日
date('Y-m-d',$weekday['end']);

年-月-日转化为时间戳  2016年10月08日
preg_match_all('/\d/',$table_date,$arr);

年-月-日转化为时间戳
strtotime($times[$i])

获取当前时间
date("Y-m-d H:i:s",time());

获取当前月的最后一天
date('t', strtotime($lastStartDay))

获取当前时间的前一天
date("Ymd",strtotime("-1 day"));

求出2017年第二周第一天是几号的时间戳
strtotime('2017W02');

一、带零
echo date('Y-m-d');
2012-08-08
二、不带零
echo date('Y-n-j');//2012-8-8

$year_now = date('Y',strtotime('2016-12-28'));
$month_now = date('m',strtotime('2016-12-28'));
$day_now = date('d',strtotime('2016-12-28'));
求出所在年的属于第几周
$week_now = date('W',strtotime(implode('-',array($year_now,$month_now,$day_now))));


echo  date('Y-m-d 23:59:59',strtotime('2017' . '-' . '02' . '-' . cal_days_in_month(CAL_GREGORIAN,'02','2017')));die;

2017-02-28 23:59:59


<input type="date">这就会自带日期控件了

HTML5 拥有多个供选择日期和时间的新的输入类型：
date - 选择日、月、年
month - 选择月、年
week - 选择周、年
time - 选择时间（时、分）
datetime - 选择时间、日期、月、年（UTC 时间）
datetime-local - 选择时间、日期、月、年（本地时间）



#### cal_days_in_month   基于指定的年份和历法，获取一个月中的天数
```php
<?php
$d=cal_days_in_month(CAL_GREGORIAN,2,2016);
echo "2016 年 2 月有 $d 天。";
?>
```


#### mktime()返回一个日期的 UNIX 时间戳。然后使用它来查找该日期的天
> mktime(hour,minute,second,month,day,year);

```php
<?php
$year_end = mktime(0,0,0,12,31,2017);
// $year_end  结果是  1514649600
echo date('Y-m-d',1514649600); //2017-12-31
?>
```
#### 计算两个时间的差值
```php
$date_start = date('Y-m-d',strtotime('2016-06-01'));
$date_end = I('request.date_end') ? I('request.date_end') : date('Y-m-d',strtotime('-1 day',time()));
$days = date_diff(date_create($date_end),date_create($date_start));
if($days->format('%a')>365){
 	$date_start = date('Y-m-d',strtotime('-365 day',strtotime($date_end)));
}
```