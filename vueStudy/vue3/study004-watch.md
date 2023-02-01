# 监听
watch 和 watchEffect
- watchEffect: 不需要指定监听的属性, 自动收集依赖, 只要在回调中引用到了响应式的属性,只要这些属性发生改变,回调就会执行
- watch: 只能侦听指定的属性, 做出回调函数的执行, 可以侦听多个
- watch: 可以获取到新值和旧值, watchEffect: 不能
- watchEffect: 在组件初始化的时候就会自动执行一次, 用来收集依赖, 
- watch: 不需要, 一开始就指定了

## watch
- 不能监听属性
```vue
<script >
import {watch} from "vue"

export default {
  setup() {
    // 监听单个
    const num = ref(0)
    function changeNum() {
      num.value++
    }
    
    // 监听属性
    const user = reactive({
      name: '张三',
      age: 19
    })
    function changeName() {
      user.name = '李四'
    }
    
    // 能监听到, 分别打印出新值和旧值
    watch(num,(newVal, oldVal) => {
      console.log("newVal----", newVal) // 1
      console.log("oldVal----", oldVal) // 0
    })
    // 监听不到属性, 只能打印出新值
    watch(user,(newVal, oldVal) => {
      console.log("newVal----", newVal) // 李四
      console.log("oldVal----", oldVal) // 李四
    })
    
    watchEffect(() => {
      console.log(user.name)
    })
  }
}

</script>
```

## watchEffect 
- 不需要指定监听的属性
- 组件初始化的时候会执行一次回调函数, 自动收集依赖
- watchEffect(回调函数)