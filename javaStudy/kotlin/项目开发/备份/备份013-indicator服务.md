## application.yml
```yaml
spring:
  config:
    import:
      - optional:nacos:xxl-job-${spring.profiles.active}.yaml
        
app:
  job:
    app-name: @moduleName@
    port: 9999
    server-address: "http://192.168.3.205:7999/xxl-job-admin"
    access-token: "default_token"
```