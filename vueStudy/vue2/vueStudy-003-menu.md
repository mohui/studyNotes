# 本章是menu的学习笔记

关键字|说明
:---|:---
[NavMenu](#导航菜单) | menu的基础用法
[基础学习](#基础学习) | menu的基础用法

## 导航菜单


## 基础学习

### el-menu
关键字|说明 | 补充说明
:---|:---|:---
:default-openeds | 默认打开(展开) | [openeds](#default-openeds)
:default-active | 默认路由跳转 | 表示当前active的菜单项的编号
router | 需要写上 | 

### el-menu-item
关键字 | 说明 | 补充说明
:---|:---|:---
route | 跳转的地址
index |  类型为字符串，在每一个el-menu-item组件上都有一个编号，给default-active标记

```vue
<el-menu 
  :default-openeds="['1']"
  :default-active="this.$router"
  router
>
  <el-submenu index="1">
    <template slot="title"><i class="el-icon-message"></i>导航</template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item route="/restaurant" index="restaurant">饭店</el-menu-item>
        <el-menu-item route="/school" index="school">学校</el-menu-item>
        <el-menu-item route="/hospital" index="hospital">医院</el-menu-item>
      </el-menu-item-group>
  </el-submenu>
</el-menu>
```
>使用菜单栏进行路由跳转有几个注意点：
 ~~1, 在el-menu加上:router=“true”~~  
 2, index必须绑定路由的path,参考上面的例子，’/’不能少  
 3, default-active设为当前路由（this.$route）,这样在路由变化的时候，对应的menu-item才会高亮。


#### default-openeds
> :default-openeds=['...'] 属性内容和下面的 
> <el-submenu index="..."> 里面的index内容是关联的，两个属性内容是一样的就可以关联了

