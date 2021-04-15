### 方法说明
关键字|解释|说明
:---|:---|:---
asyncComputed | 异步计算属性 | 异步获取数据
computed | 计算属性 | 是对数据的进一步转换,后端获取的数据可能不能直接用
methods | 定义的是函数 | 需要像"fuc()"这样去调用它
watch | 类似于监听机制+事件机制 | [watch](#watch)
created() | 钩子函数 | [详解函数](#详解函数)
mounted() | 钩子函数 | [详解函数](#详解函数)


#### 详解函数

生命周期？ 就是Vue中实例或者组件从创建到消灭中间经过的一系列过程。

created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。

mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。

#### watch
```javascript
// 如果 hospitalId 发生改变,就会运行这个函数
export default {
  data() {
    return {
      hospitalIds: [],
      hospitalId: ''
    };
  },
  watch: {
    hospitalId: function (){
      this.hospitalIds = [this.hospitalId];
    }
  }
}
```
                   