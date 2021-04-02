# vue-Element
### 表单
```vue
<el-table
      v-loading="$asyncComputed.dataList.updating"
      :data="tableData"
      style="width: 100%"
      size="small">
</el-table>
```
#### 属性

关键字|说明|类型|可选值|默认值|补充说明
:---|:---|:---|:---|:---|:---
size | Table的尺寸 | string | medium/small/mini | — | 可以控制标题字体的大小