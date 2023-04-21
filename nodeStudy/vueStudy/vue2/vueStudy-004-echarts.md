### 柱状图
```javascript
// https://echarts.apache.org/zh/option.html#dataZoom
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

### 仪表盘
```vue
<template>
  <div>
    <div class="grid-content bg-fff">
      <div
        ref="charts"
        :class="{'cursor-pointer': onClick}"
        :style="{width: '100%', height: '300px'}"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwoCardCircle',
  props: {
    coefficient: Number,
    pointDate: String,
    onClick: Function,
    text: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#409EFF'
    }
  },
  data() {
    return {
      chartId: {},
      chart: {
        title: {
          show: true,
          text: '质量系数(%)',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            color: this.color
          },
          top: 0,
          left: '5px'
        },
        tooltip: {formatter: '{a} <br/>{b} : {c}%'},
        series: [
          {
            name: '质量系数',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            radius: '100%',
            center: ['50%', '70%'],
            axisLine: {
              lineStyle: {
                width: 30,
                color: []
              }
            },
            axisTick: {show: false},
            axisLabel: {
              show: true,
              distance: 5,
              textStyle: {color: '#000'},
              formatter: function(e) {
                switch (e + '') {
                  case '10':
                  case '20':
                  case '30':
                  case '40':
                  case '60':
                  case '70':
                  case '80':
                  case '90':
                    return '';
                  default:
                    return e;
                }
              }
            },
            splitLine: {show: false},
            pointer: {show: false},
            title: {
              offsetCenter: [0, '-3%'],
              textStyle: {color: this.color, fontSize: '14'}
            },
            detail: {
              show: true,
              formatter: '{value}',
              offsetCenter: [0, '-30%'],
              textStyle: {color: this.color, fontSize: '30', fontWeight: '600'}
            },
            data: [
              {
                value: '',
                name: ''
              }
            ]
          }
        ]
      }
    };
  },
  watch: {
    coefficient: function() {
      this.circleChart();
    }
  },
  mounted() {
    this.chartId = this.$echarts.init(this.$refs['charts']);
    this.circleChart();
    window.addEventListener('resize', this.chartId.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartId.resize);
  },
  methods: {
    circleChart() {
      this.chart.series[0].axisLine.lineStyle.color = this.coefficient
        ? [
            [this.coefficient / 100, this.color],
            [1, '#f6f7fa']
          ]
        : [
            [0, this.color],
            [1, '#f6f7fa']
          ];
      this.chart.series[0].data[0].value = this.coefficient
        ? this.coefficient
        : 0;
      this.chart.series[0].data[0].name = this.pointDate
        ? this.pointDate + '\n' + this.text
        : '';
      this.chartId.setOption(this.chart);
      this.chartId.getZr().off('click');
      this.chartId.getZr().on('click', () => this.onClick?.());
    }
  }
};
</script>

<!--变成小手-->
<style scoped>
::v-deep .cursor-pointer canvas {
  cursor: pointer;
}
</style>

```