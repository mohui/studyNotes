替换完以后 点击安全与设置  仍要打开  输入密码
1. 查看列表
```
curl -X POST http://localhost:13147/all 
```
```
["HK","USA2","USA","JP","KR"]% 
```
2. 当前
```
curl -X POST http://localhost:13147/current
```
3. 修改为JP
```
curl -X POST http://localhost:13147/switch/JP
```