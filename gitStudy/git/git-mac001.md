## Mac 配置 SSH-Key

### 检查.ssh 文件夹是否存在

#### 检查 .ssh文件夹是否存在
- 不存在: total 0
```yaml
ls -al ~/.ssh
```
#### 进入到 .ssh
```yaml
cd ~/.ssh
```

### 生成本地公钥,查看并赋值
- 运行以下命令后
- ls 查看.ssh 文件
- id_rsa		id_rsa.pub	known_host
```yaml
ssh-keygen -t rsa -C "1578833180@qq.com"
```

### 查看刚刚生成的 SSH-Key
- 运行以下生成密钥以后
- 到github上个人主页 -> SSH and GPG keys 
```yaml
cat id_rsa.pub
```
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCZy3M/jj86tBdS1N75h7Co1q8hOfBaKcIdDPq/sxiE1Fxdj3eG4AnxV85deWMMenAB8wEMBlNOioK8zqnVdOQTdu2W2IhuhIGCaMgpOb1fQNCnPslFgky6PAfhq5P1dPy542GlDDbIYiwIcx3PlhVcfRe6MTfQ7W+JRTZfB7JT5OEPL1prk+VLQkaZaLj1XlUoIBdz7DQ4eEGLA97TmIl6vzYx4zd/lhJxE5ZV4os0RY1JhQhl3Sm5inPcwpkPozFCTCdA4vMR/4e79/gFxlpYZnGXNUxrmvAyC9dj7R+395CpwRA6B3q05wVRO6QezBMByztzyKhnxgX7lhbf4leZ wanghehui@bjknrt.com
```