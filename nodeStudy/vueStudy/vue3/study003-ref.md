## ref() 定义响应式变量
- ref() 返回带有value属性的对象
```vue
<script >
const isDel = ref(true)
function setDel() {
  isDel.value = false
}
</script>

这里不用写 {{idDel.value}} 模版会自动解析value值
<template>
  <div>
    {{ isDel }}
  </div>
</template>
```

## reactive 定义引用类型的数据
- 如果使用es6的解构(...)会变为不是响应式的
```vue
<script >
const obj = reactive({
  name: '张三',
  age: 13
})

function changeObjName() {
  obj.name = '李四'
}

</script>

<template>
  <div>
    {{ obj.name }}
  </div>
</template>
```

## toRefs 使解构后的数据重新获取响应式
```vue
<script>
export default {
  setup(){
    const obj = reactive({
      name: '张三',
      age: 13
    });
    return {...toRefs(obj)}
  }
}
</script>
```