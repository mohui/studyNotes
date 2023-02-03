# vue3

## 语法糖
```vue
<script setup></script>
```
相当于
```vue
<script >
export default {
  setup() {
  }
}
</script>
```
- 定义响应式的变量, 还是需要从vue中引入
```vue
<script setup>
import {ref} from 'vue'

const num = ref(20)
</script>
```