# 事件
- .stop 阻止事件冒泡
- .prevent 阻止默认行为
- .once 只触发一次回调

## click 点击事件

- 点击子元素 会打印出 子元素点击 和 父元素点击
- .stop 阻止事件冒泡
```vue
<script >
export default {
  divClick: function () {
    console.log("父元素点击")
  },
  butClick: function () {
    console.log("子元素点击")
  }
}
</script>
<template>
  
  <div @click="divClick">
    <button @click="butClick">子元素按钮</button>
  </div>
</template>
```

### stop 阻止事件冒泡
- 以上点击 子元素按钮 只会打印出 子元素点击
```vue
<button @click.stop="butClick">按钮</button>
```

### .once 只触发一次回调
- 没有.once, 每点一次都会打印一次, 如果有.once, 无论点击多少次只会打印一次
```vue
<script >
export default {
    butClick: function() {
      console.log("触发")
    }
}
</script>

<button @click.once="butClick">按钮</button>
```
