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

# JWT
## token 加密
```js
// 引入jwt
const jwt = require('jsonwebtoken');
// 生成token
// let token = jwt.sign('用户数据'，'加密字符串'， '配置对向')

let token = jwt.sign({
        username: '张三'
    },
    'knrt',
    {
        expiresIn: 60 //单位是秒
    })
// token会生成一个字符串
const t = '模拟生成的一串字符串';
// 校验token
jwt.verify(
    t,
    'knrt',
    (err, data) => {
        if (err) {
            console.log('生成失败');
            return;
        }
        console.log(data);
    }
)

```