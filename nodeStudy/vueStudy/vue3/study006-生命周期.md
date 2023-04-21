# 生命周期钩子
- 通过在生命周期钩子前面加 on 
```vue
<script >
import {onMounted} from "vue"

export default {
  setup() {
    onMounted(() => {
      console.log("helloWord")
    })
  
  }
}

</script>
```

