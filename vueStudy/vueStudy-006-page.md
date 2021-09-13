# 分页学习


关键字|解释|说明|类型
:---|:---|:---|:---
current-page| 当前页 |  | int
page-size| 每页显示条数 |  | int
total| 总条数 |  | int
page-sizes| 展示的选择每页显示个数的选项 | 如果没有显示默认 | 数组
```vue
<template>
  <el-pagination
    :current-page="searchForm.pageNo"
    :page-size="searchForm.pageSize"
    layout="sizes, prev, pager, next"
    style="margin:10px 0 -20px;"
    :total="1000"
    :page-sizes="[100, 200, 300, 400]"

    @size-change="
      size => {
        searchForm.pageSize = size;
        searchForm.pageNo = 1;
      }
    "
    @current-change="
      no => {
        searchForm.pageNo = no;
      }
    "
  >
  </el-pagination>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        account: '',
        name: '',
        pageSize: 10,
        pageNo: 1
      }
    }
  }
}
</script>
```
        
