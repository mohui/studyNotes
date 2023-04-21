```
fun upsert() {
    // 配置查询条件
    val example = Example(StateMetrics::class.java)
    val createCriteria = example.createCriteria()
    createCriteria.andEqualTo("userId",stateMetrics.userId)
    createCriteria.andEqualTo("metricsType",stateMetrics.metricsType)
    
    // 先查询
    val selectByExample = stateMetricsMapper.selectByExample(example)
    // 如果有数据
    selectByExample.takeIf { it.isNotEmpty() }?.let {
        stateMetrics.createdAt = it[0].createdAt
        stateMetrics.createdBy = null
        //更新 为null的不更新
        stateMetricsMapper.updateByPrimaryKeySelective(stateMetrics)
    }?: kotlin.run {
        //添加
        stateMetricsMapper.insert(stateMetrics)
    }
}
    
```