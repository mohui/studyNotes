# 柱状图
```javascript
import * as echarts from 'echarts';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    }],
    //dataZoom 组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 50
      },
      {
        type: 'inside'
      }
    ]
};

option && myChart.setOption(option);
```