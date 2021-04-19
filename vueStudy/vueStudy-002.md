# vue学习笔记

关键字|说明
:---|:---
[button按钮](#按钮组) |

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