```vue
<template>
  <div>
    <!--    <two-card-rank :rank-data="rankData"></two-card-rank>-->
    <div id="workPointRank" :style="{width: '100%', height: '500px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'twoCardRank',
  props: {
    rankData: Array
  },
  data() {
    return {
      rankAxis: {},
      option: {
        color: ['#43A7FF'],
        testStyle: {
          fontFamily: 'sans-serif'
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          max: 'dataMax'
        },
        yAxis: {
          type: 'category',
          data: [],
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300
        },
        series: [
          {
            realtimeSort: true,
            type: 'bar',
            data: [],
            barWidth: 20,
            label: {
              show: true,
              valueAnimation: true
            }
          }
        ],
        legend: {
          show: true
        }
      }
    };
  },
  mounted() {
    const charDom = document.getElementById('workPointRank');
    this.rankAxis = this.$echarts.init(charDom);
    this.rankChar();
  },
  methods: {
    rankChar() {
      this.option.yAxis.data = this.rankData.map(it => it?.name);
      this.option.series[0].data = this.rankData.map(it => it?.totalWorkPoint);
      this.rankAxis.setOption(this.option);
    }
  },
  watch: {
    rankData: function() {
      this.rankChar();
    }
  }
};
</script>

<style scoped></style>

```