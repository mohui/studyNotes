## 接收值
- Vue2写法
- $route: 表示当前活跃的路由
```vue
<script >
export default {
  mounted() {
    console.log(this.$route.params.id)
  }
}
</script>
```
- vue3写法
```vue
<script setup>
import {useRoute} from 'vue-route'
console.log(useRoute().params.id)
</script>
```