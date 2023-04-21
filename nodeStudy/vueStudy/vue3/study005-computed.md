# computed 计算属性

```vue
<script >
import {computed} from "vue"

export default {
  setup() {
    const str = ref('helloWord')
    const reverseStr = computed(() => {
      // 返回一个带有value属性的对象
      return str.value.split("").reverse().join("")
    })
    console.log(reverseStr.value)
    
    const user = reactive({
      name: '张三',
      age: 19,
      reverseStr: computed(() => {
        return str.value.split("").reverse().join("")
      })
    })
    console.log(user.reverseStr)
  }
}

</script>
```
