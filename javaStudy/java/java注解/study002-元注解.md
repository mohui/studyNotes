## 元注解
- Target
- Retention
- Document
- Inherited

### Target
- 用于描述注解的使用范围(即: 被描述的注解可以用在什么地方)
### Retention
- 表示需要什么级别保存该注解信息, 用于描述注解的生命周期
- SOURCE < CLASS < RUNTIME
### Document
- 说明该注解将被包含在 javadoc 中
### Inherited
- 说明子类可以继承父类中的该注解