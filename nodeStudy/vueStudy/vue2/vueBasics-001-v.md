### 内容绑定

```vue
<div v-text=""></div>
<div v-html=""></div>
```

```vue
<div v-on:click=""></div>
可以简写为
<div @click=""></div>  
```
### 显示切换,属性绑定
> 通过表达式真假切换元素的表现状态
> v-if 通过操作dom属性, v-show 操作的事样式,通过display属性
```vue
<div v-show=""></div>
<div v-if=""></div>
```
> v-bind 指令的作用是:为元素绑定属性
> 完整写法是 v-bind:属性名  可简写为 :属性名 
```vue
<img v-bind: src=""></img>
```

### 列表循环, 表单元素绑定
```vue
<div v-for="item in list"></div>
```
- key: 添加唯一标识
> v-on: 传递自定义参数, 事件修饰符
> 事件绑定的方法写成函数调用的形式,可以传入自定义参数
> 定义方法的时候需要定义形参来接收传入的实参
> 事件的后面跟上 .修饰符 可以对事件进行限制 eg: .enter 限制触发的按键为回车
```vue
<div v-on=""></div>
<input type="text" @keyup.enter="方法名">
```

> v-model 便捷的设置和获取表单元素的值
> 绑定的数据会和表单元素值相关联
> 双向绑定 绑定的数据 <=> 表单元素的值 
```vue
<div v-model=""></div>
```