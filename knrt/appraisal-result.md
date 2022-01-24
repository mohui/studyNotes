# 备份
## 历史趋势备份
```vue
<el-col :span="10" :xs="24" :sm="12" :md="10" :lg="10" :xl="10">
  <el-card
    v-loading="
      $asyncComputed.historicalTrendLineChartSeverData.updating
    "
    shadow="hover"
  >
    <div class="score-detail">
      <line-chart
        :x-axis-data="historicalTrendLineChartData.xAxisData"
        :y-axis-data="historicalTrendLineChartData.yAxisData"
        line-text="%"
        :list-flag="params.listFlag"
      ></line-chart>
    </div>
  </el-card>
</el-col>



<!--下级金额分配-->
<el-col :span="10" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
  <el-card
    v-loading="$asyncComputed.rankServerData.updating"
    shadow="hover"
  >
    <div class="score-detail">
      <two-card-tree-map
        :map-data="budgetData"
        :color="color"
        empty-text="尚未配置金额"
      ></two-card-tree-map>
    </div>
  </el-card>
</el-col>

<!--下级工分值图-->
<el-col :span="6" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
  <el-card
    v-loading="$asyncComputed.rankServerData.updating"
    shadow="hover"
  >
    <div class="score-detail">
      <two-card-tree-map :map-data="mapData"></two-card-tree-map>
    </div>
  </el-card>
</el-col>
```
> javascript
```javascript
import lineChart from './components/twocardLine';
import twoCardTreeMap from './components/twocardTreemap';

export default {
    components: {
        twoCardTreeMap,
        lineChart
    },
    computed: {
        //历史趋势数据，折线图展示
        historicalTrendLineChartData() {
          const data = this.historicalTrendLineChartSeverData;
          let result = {};
          result.xAxisData = data.map(it => {
            return it.date;
          });
          result.yAxisData = data.map(it => {
            return Number((it.rate * 100).toFixed(2));
          });
          return result;
        },
        //金额：矩形树状图
        budgetData() {
          let arr = this.rankServerData
            .filter(it => it.budget)
            .map(it => ({
              id: it.code,
              name: `${it.name} 金额：${it.budget.toFixed(2)}元`,
              value: it.budget,
              onClick: () =>
                this.$router.push({
                  name: 'appraisal-result',
                  query: {
                    ...this.params,
                    id: it.code
                  }
                })
            }));
          return arr;
        },
        //工分：矩形树状图
        mapData() {
          let arr = this.rankServerData
            .filter(it => it.correctWorkPoint)
            .map(it => ({
              name: `${it.name} 工分值：${Math.round(it.correctWorkPoint)}分`,
              value: it.correctWorkPoint,
              onClick: () =>
                this.$router.push({
                  name: 'appraisal-result',
                  query: {
                    ...this.params,
                    id: it.code
                  }
                })
            }));
          return arr;
        },
    },
    asyncComputed: {
        //历史趋势数据
        historicalTrendLineChartSeverData: {
          async get() {
            return await this.$api.SystemArea.history(
              this.params.id,
              this.params.year
            );
          },
          default() {
            return [];
          }
        },
    
    },
    methods: { 
        testClick() {
          return this.$router.push({
            name: 'a',
            query: {
              ...this.params
            }
          });
        }
    }
}
```