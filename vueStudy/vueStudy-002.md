# vue学习笔记 (vue-Element)

关键字|说明
:---|:---
[表单](#表单) |
[button按钮](#按钮组) |

## 表单
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
## 按钮组
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
