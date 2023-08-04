# 加密
- bcryptjs 加密

## bcryptjs 加密

### 安装
```yaml
npm i bcryptjs@2.4.3
```

### 对用户进行加密
```js
const bcrypt = require('bcryptjs')
bcrypt.hashSync('123456', 10)
```