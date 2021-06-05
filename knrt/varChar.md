```
<template>
  <div>
    <div>
      <el-button type="primary" @click="initCharts">按钮</el-button>
      <el-button type="primary" @click="buttonCharts">按钮</el-button>
    </div>
    <div>
      这个是name
      {{ xyData.x }}
    </div>
    <div>
      这个是student
      {{ xyData.y }}
    </div>

    <div
      id="myChart"
      style="display: inline-block; width: 550px; height: 550px"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      myChart: ''
    };
  },
  computed: {
    xyData() {
      return {
        x: this.serDataService?.map(it => it.name),
        y: this.serDataService?.map(it => it.student)
      };
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById('myChart'));
  },
  methods: {
    initCharts() {
      console.log(this.xyData);
      // 基于准备好的dom，初始化echarts实例
      let option = {
        xAxis: {
          type: 'category',
          data: this.xyData.x
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.xyData.y,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      this.myChart.setOption(option);
    },
    buttonCharts() {
      this.id = true;
      this.xyData.map(it => ({
        ...it,
        student: (it.student += 2)
      }));
      console.log(this.xyData);
    }
  },
  asyncComputed: {
    serDataService: {
      async get() {
        return await this.$api.AuditLog.schoolList();
      },
      default() {
        return [];
      }
    }
  },
  watch: {
    xyData: function() {
      this.initCharts;
    }
  }
};
</script>

<style></style>

```


```
async schoolList(id) {
    const list = [
      {
        name: '一年级',
        student: 20
      },
      {
        name: '二年级',
        student: 30
      },
      {
        name: '三年级',
        student: 20
      },
      {
        name: '四年级',
        student: 20
      },
      {
        name: '五年级',
        student: 30
      },
      {
        name: '六年级',
        student: 20
      }
    ];
    if (id) list[3].student = 60;
    return list;
  }
```