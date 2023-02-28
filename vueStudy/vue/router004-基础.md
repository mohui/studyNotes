## 1， 页面实现（html模版中）

- 在vue-router中, 我们看到它定义了两个标签<router-link> 和<router-view>来对应点击和显示部分。
- <router-link> 就是定义页面中点击的部分，
- <router-view> 定义显示部分，就是点击后，区配的内容显示在什么地方
- 所以 <router-link> 还有一个非常重要的属性 to，定义点击之后，要到哪里去， 如：<router-link  to="/home">Home</router-link>

### <router-link>
- 本质是个a标签, 所以拥有a标签的属性
```vue
<router-link to="/">默认目录</router-link>
<router-link to="/a">指定目录</router-link>
<router-link to="{name: 'b'}">根据name定义的目录</router-link>
```