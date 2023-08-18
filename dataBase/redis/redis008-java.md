# springBoot应用redis
## redis事务
- 除了基本的操作, 我们常用的方法都可以直接通过`redisTemplate`操作, 比如事务和基本的CURD
```bash
class redis{
  private RedisTemplate redisTemplate;
  @Test
  void contextTest() {
    # redisTemplate 操作不同的数据类型,api和我们的指令一样的
    
    # redisTemplate.opsForValue; # 操作字符串, 类十余string 
    # redisTemplate.opsForList; # 操作list
    # redisTemplate.opsForSet; # 操作set
    # redisTemplate.opsForHash; # 操作hash
    # redisTemplate.opsForZset; # 操作Zset
    # redisTemplate.opsForGeo; # 操作geo
    # redisTemplate.opsForHyperLogLog; # 操作HyperLogLog
    
    # 获取redis链接对象 
    RedisConnection connection = redisTemplate.getConnectionFactory().getConnection()
    # 清除当前数据库
    connection.flushDb();
    # 清除全部数据库
    connection.flushAll();
    
    # 除了基本的操作, 我们常用的方法都可以直接通过`redisTemplate`操作, 比如事务和基本的CURD
     
     # 设置string类型
     RedisTemplate.opsForValue().set("myKey", "helloWord");
     # 获取string类型
     RedisTemplate.opsForValue().get("myKey");
  } 
}
```