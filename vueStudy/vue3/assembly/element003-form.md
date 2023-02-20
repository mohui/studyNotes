# form 表单介绍
## el-form
- rules: 校验prop的值
## el-form-item
- prop: 属性设置为需要验证的特殊键值,
```vue
<el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
    <el-form-item label="登录名" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>
</el-form>
```

```
<script setup lang="ts">

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const msg = ref("登录页面")

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入登录名', trigger: 'blur' },
    { min: 3, max: 12, message: '长度应为3-12', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度应为6-12', trigger: 'blur' },
  ]
})

</script>
```
