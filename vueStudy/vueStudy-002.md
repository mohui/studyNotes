# vue学习笔记(vue-Element)

关键字|说明
:---|:---
[table](#table) |
[Loading 加载](#Loading) |
[下拉菜单](#下拉菜单) |
[按钮和点击事件](#按钮和点击事件) |
[日期选择器](#日期选择器) |
[button按钮组](#按钮组) |


## table
```vue
<el-table
      v-loading="$asyncComputed.dataList.updating"
      :data="tableData"
      style="width: 100%"
      size="small">
</el-table>
```

#### Loading
```
v-loading="true"
// 配合asyncComputed使用, dateList是数据
v-loading="$asyncComputed.dataList.updating"
``` 

#### 下拉菜单
```html
<el-form-item label="下拉菜单：">
<el-select
  clearable
  v-model="searchForm.roleId"
  placeholder="请选择"
  style="width: 100%;"
>
  <el-option
    v-for="item in roleList"
    :key="item.id"
    :label="item.name"
    :value="item.id"
  >
  </el-option>
</el-select>
</el-form-item>
<!-- 另一种形式的下拉菜单-->
<el-col :span="6" :xs="24" :sm="12" :md="6" :lg="7" :xl="6">
    <el-form-item v-if="!single">
      <div style="display: flex">
        <el-cascader
          size="mini"
          v-model="params.hospitalId"
          :options="allLevelHospitals"
          :props="hospitalsOption"
          :placeholder="'请选择地区'"
          style="width: 100%"
          clearable
          collapse-tags
          :show-all-levels="false"
          filterable
        ></el-cascader>
      </div>
    </el-form-item>
</el-col>
```
```javascript
export default{
    data() {
        return {
              // 地区
              hospitalsOption: {
                lazy: false,
                multiple: false,
                checkStrictly: true,
                emitPath: false,
                value: 'id',
                label: 'name'
              },
              allLevelHospitals: this.$settings.allLevelHospitals,
              params: {
                hospitalId: ""
              },
        }
    }
}
```
#### 按钮和点击事件
```html
<el-button type="primary" @click="add">大面积</el-button>
```
```javascript
export default {
    data() {
        return {
            value2: 1
        }
    },
    methods: {
        add() {
          this.value2 = this.value2 + 1;
        },
        onSubmit() {
          console.log('submit!');
        }
    }
}
```
#### 日期选择器
> DatePicker
```html
<div class="block">
  <el-date-picker
    size="mini"
    v-model="date"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期">
  </el-date-picker>
</div>
```
```javascript
export default {
    async created() {
        // 设置默认值
        const end = dayjs(dayjs().format('YYYY-MM-DD')).subtract(1, "day").toDate();
        const start = dayjs(end).subtract(7, "day").toDate();
        this.date = [start,end];
    },
    data() {
        return {
          date: ''
        }
    }
}
```

#### 按钮组
> 高亮点击的那个, 根据变量params.selFlag判断
```html
<el-button-group>
    <el-button
        size="small"
        :class="{'el-button--primary': params.selFlag === 'moneyList'}"
        @click="tagTypeChanged('moneyList')"
    >
    实时金额
    </el-button>
    <el-button
        size="small"
        :class="{'el-button--primary': params.selFlag === 'upsertMoney'}"
        @click="tagTypeChanged('upsertMoney')"
    >
    年度结算
    </el-button>
</el-button-group>
```
```
<el-page-header>
            <template v-slot:content>
              dfasfadfda
            </template>
          </el-page-header>
```

## 备份
```
            <el-col :span="24">
              <el-card>
                <div class="grid-content bg-fff">
                  <div
                    id="charts"
                    :style="{width: '100%', height: '300px'}"
                  ></div>
                </div>
              </el-card>
            </el-col>


    this.testCharts();


    async testCharts() {
      await this.$nextTick();
      let chart = this.$echarts.init(document.getElementById('charts'));

      const option = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 240,
            splitNumber: 12,
            itemStyle: {
              color: '#58D9F9',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            progress: {
              show: true,
              roundCap: true,
              width: 18
            },
            pointer: {
              icon:
                'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              length: '75%',
              width: 16,
              offsetCenter: [0, '5%']
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 18
              }
            },
            axisTick: {
              splitNumber: 2,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              length: 12,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 30,
              color: '#999',
              fontSize: 20
            },
            title: {
              show: false
            },
            detail: {
              backgroundColor: '#fff',
              borderColor: '#999',
              borderWidth: 2,
              width: '60%',
              lineHeight: 40,
              height: 40,
              borderRadius: 8,
              offsetCenter: [0, '35%'],
              valueAnimation: true,
              formatter: function(value) {
                return '{value|' + value.toFixed(0) + '}{unit|km/h}';
              },
              rich: {
                value: {
                  fontSize: 50,
                  fontWeight: 'bolder',
                  color: '#777'
                },
                unit: {
                  fontSize: 20,
                  color: '#999',
                  padding: [0, 0, -20, 10]
                }
              }
            },
            data: [
              {
                value: 100
              }
            ]
          }
        ]
      };
      chart.setOption(option);
      chart.on('click', function() {
        console.log('hello');
      });
    }
```


```
<template>
  <div>
    <div class="grid-content bg-fff">
      <div id="charts" :style="{width: '100%', height: '300px'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'twocardCircle',
  props: {
    coefficient: Number,
    pointDate: String,
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
  mounted() {
    this.circleChart();
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
      let chart = this.$echarts.init(document.getElementById('charts'));
      window.addEventListener('resize', function() {
        chart.resize(); //使图表适应
      });
      chart.setOption(this.chart);
    }
  },
  watch: {
    coefficient: function() {
      this.circleChart();
    }
  }
};
</script>

<style scoped></style>

```