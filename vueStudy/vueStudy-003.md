# vue学习笔记

关键字|说明
:---|:---
[获取数据](#获取数据) |
[表单](#表单) |
[Loading 加载](#Loading) |
[下拉菜单](#下拉菜单) |
[按钮和点击事件](#按钮和点击事件) |
[日期选择器](#日期选择器) |

> $ 开头代表是插件
>
> {{}} 里面放变量
```vue
<template>
</template>

<script>
export default {
  data() {
    return {
      name: "测试",
    };
  }
}
</script>

<style scoped>

</style>
```
## 获取数据

关键字|说明
:---|:---
asyncComputed | 异步获取数据
computed | 是对数据的进一步转换,后端获取的数据可能不能直接用
```javascript
export default {
  data() {
    return {
      name: "测试",
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      // 配置文件里获取
      list: this.$settings.allLevelHospitals
    };
  },
  asyncComputed: {
    dataList: {
      async get() {
        return await this.$api.Test.test();
      },
      default() {
        return [];
      }
    }
  }
};
```
## 表单
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