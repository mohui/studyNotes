
## 1、常用JSON|JSONObject|JSONArray介绍
```markdown
https://blog.csdn.net/fanpeng1100/article/details/52856813
https://blog.csdn.net/Double____C/article/details/89969204? utm_medium=distribute.pc_relevant.none-task-blog-baidujs-1
https://mp.weixin.qq.com/s/ElTHj_Vx6DSFK4GpxiOfzA https://blog.csdn.net/fanpeng1100/article/details/52856813
```

```
前端: 前台是操作JSON对象才能获取对象中的属性。 
JSON.stringify(obj)将JSON对象转为字符串。 
JSON.parse(string)将JSON字符串转为JSON对象格式; 
eval('('+ jsonstr + ')');将JSON字符串转为JSON对象格式; 
$.parseJSON( jsonstr ); 可以将JSON字符串转换成JSON对象;
```
```
后端:JSONObject和JSON字符串，格式一致，区别在于是否有引号(双引 号或单引号)，而且类中方法不同(前台同理)。
在后台 JSONObject和JSON字符串显示的格式和内容是一样的(后台没有双 引号区分，前台有引号区分)，所以只能根据类型区分。
@ResponseBody是转成JSON字符串给前台。 Object是根据toString方法的格式打印出来和json格式不同。
```

## 后台工具类:
### Google的Gson https://www.cnblogs.com/qinxu/p/9504412.html

- 依赖
```html
<dependency> 
    <groupId>com.google.code.gson</groupId> 
    <artifactId>gson</artifactId> 
    <version>2.8.3</version> 
    <classifier>jdk15</classifier>
</dependency>
```

```
Gson是目前功能最全的Json解析神器，
Gson当初是为因应Google公司 内部需求而由Google自行研发而来，但自从在2008年五月公开发布第一 版后已被许多公司或用户应用。
Gson的应用主要为toJson与fromJson 两个转换函数，无依赖，不需要例外额外的jar，能够直接跑在JDK上。
而在使用这种对象转换之前需先创建好对象的类型以及其成员才能成功 的将JSON字符串成功转换成相对应的对象。
类里面只要有get和set方法，Gson完全可以将复杂类型的json到bean或bean到json的转换，是 JSON解析的神器。
Gson在功能上面无可挑剔，但是性能上面比FastJson有所差距。
```

##### 1、API
```
Gson类:解析json的最基础的工具类 
JsonParser类:解析器来解析JSON到JsonElements的解析树 
JsonElement类:一个类代表的JSON元素 
JsonObject类:JSON对象类型 
JsonArray类:JsonObject数组 
TypeToken类:用于创建type，比如泛型List<?>
```
##### Gson类 

1. bean(对象，集合，数组)转json字符串
```markdown
Gson gson=new Gson();
String json = gson.toJson(obj);
```
2. json字符串转bean(8种基本类型，bean对象)
```
Gson gson = new Gson();
String json = "{\"id\":\"2\",\"name\":\"Json技术\"}"; 
T book = gson.fromJson(json, T.class);
```
3. json字符串转复杂bean(集合,数组)
```
Gson gson = new Gson();
String json = "[{\"id\":\"1\",\"name\":\"Json技术\"},
{\"id\":\"2\",\"name\":\"java技术\"}]"; 
//将json字符串转换成List
List list = gson.fromJson(json,new TypeToken<List>() {}.getType());
//将json字符串转换成Set
Set set = gson.fromJson(json,new TypeToken<Set>() {}.getType());
//将json字符串转换成Set
String[] strings = gson.fromJson(json, String[].class); 
//格式化json字符串
String json = "[{\"id\":\"1\",\"name\":\"Json技术\"}, {\"id\":\"2\",\"name\":\"java技术\"}]";
Gson gson = new GsonBuilder().setPrettyPrinting().create();
JsonParser jp = new JsonParser(); 
JsonElement je = jp.parse(json); 
json = gson.toJson(je);
```
(4)、JSON字符串转JsonObject,并且获取JSONObject中的属性
```
JsonObject jsonObject = new JsonParser().parse(json 串).getAsJsonObject();
String msg = jsonObject.get("msg属性 名").getAsJsonObject().getAsString();
String code= jsonObject.get("code属性名").getAsJsonObject().getAsString();
```  
### 二、Alibaba的fastjson
https://blog.csdn.net/srj1095530512/article/details/82529759

依赖
```html
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.41</version> 
</dependency>

```

```markdown
Fastjson是一个Java语言编写的高性能的JSON处理器,由阿里巴巴公司开发。
无依赖，不需要例外额外的jar，能够直接跑在JDK上。
FastJson 在复杂类型的Bean转换Json上会出现一些问题，可能会出现引用的类型，导致Json转换出错，需要制定引用。
FastJson采用独创的算法，将parse的速度提升到极致，超过所有json 库。
Fastjson的API入口类是com.alibaba.fastjson.JSON,常用的是其中的静 态方法.父类都是JSON,所以可以直接使用JOSN操作
```

```
com.alibaba.fastjson.JSONObject extends JSON implements 
Map<String, Object>, 
Cloneable, 
Serializable,
InvocationHandler 
com.alibaba.fastjson.JSONArray extends JSON implements List<Object>,
Cloneable, Serializable
```

### JSON(实现json对象，json对象数组，javabean对象，json文本之间的相互转化。)
1. 把JSON文本----->对象(JSONObject， JSONArray,JavaBean)
```
public static final Object parse(String text); // 把JSON文本 parse为JSONObject或者JSONArray
public static final JSONObject parseObject(String text); // 把JSON文本parse成JSONObject
public static final <T>T parseObject(String text, Class<T> clazz); // 把JSON文本parse为JavaBean
T t=JSON.parseObject(String text,new TypeReference<T>() {});// 把JSON文本parse为JavaBean
public static final JSONArray parseArray(String text); // 把 JSON文本parse成JSONArray
public static final <T> List<T>parseArray(String text, Class<T> clazz); //把JSON文本parse成JavaBean集合
```
2. 把JavaBean(对象，Map，Collection)----JSON文本， JSONObject，JSONArray 
(fastJson在转换java对象为json的时 候，默认是不序列化null值的属性，也可以使用)

```
public static final String toJSONString(Object object); // 将 JavaBean序列化为JSON文本
public static final String toJSONString(Object object, boolean prettyFormat); // 将JavaBean序列化为带格式的JSON文本
public static final Object toJSON(Object javaObject); //将 (JavaBean，Map)和Collection转换为JSONObject和 JSONArray。

(3) 把JSONObject转成JavaBean
public static <T> T toJavaObject(JSON json, Class<T> clazz)
---JSONObject(提供put/get方法，底层map<k,v>实现)
{
"ID": 1001, "name": "张三", "age": 24
}
(1)对象(JSONObject，JSONArray,JavaBean)---->JSON 文本
String str=JSONObject.toJSONString(Object object, SerializerFeature... features)
Object o = JSONObject.toJSON(Object javaObject);// (JSON-->JSON,Map-->JSONbject，Collection-->JSONArray， JSONSerializable-->Object,Object-->Object)
(2)把JSON文本----->对象(JSONObject， JSONArray,JavaBean)
Object o=JSONObject.parse(String text);
JSONObject jo=JSONObject.parseObject(String text); 
JSONArray jsonArray= JSONObject.parseArray(String text);
List<T> list= JSONObject.parseArray(String text, Class<T> clazz)
---JSONArray(提供add/set/get/remove/size/iterator方法，底 层List实现,主要操作JSONObject)
[
    {"ID": 1001, "name": "张三", "age": 24},
    {"ID": 1002, "name": "李四", "age": 25}, {"ID": 1003, "name": "王五", "age": 22}
]
(1)JSONArray中获取指定位置JSONObject
JSONArray jsonArray= new JSONArray();
JSONObject jsonObject = jsonArray.getJSONObject(int
index);
(2)把JSON文本----->对象(JSONObject， JSONArray,JavaBean,javaBean)
Object o=JSONArray.parse(String text);
JSONObject jsonObject = JSONArray.parseObject(String text)
List<T> list = JSONArray.parseArray(String text);
JSONArray jsonArray = JSONArray.parseArray(String text, Class<T> clazz)
(3)把JSONArray对象数组---->json文本
public String toJSONString();
public static String toJSONString(Object object,
SerializerFeature... features)
(4)把JSONArray对象数组---->javaBean数组 public Object[] toArray();
```
##### 使用TypeReference
```
// 可以直接使用
HashMap<String, String> map = JSONObject.parseObject(str, new TypeReference<HashMap<String, String>>(){});
// 其他类型对象 
EnjoyResponseDTO<EnjoyPageResponseDataDTO<Long>> result = 
    JSONObject.parseObject(str, new TypeReference<EnjoyResponseDTO<EnjoyPageResponseDat aDTO<Long>>>(){});
// 或者type的构造中使用参数 
EnjoyResponseDTO<EnjoyPageResponseDataDTO<T>> result = 
JSONObject.parseObject(str, new TypeReference<EnjoyResponseDTO<EnjoyPageResponseDat aDTO<T>>>(Long.class){});
List<String> list2 = jsonObj.getObject("a", new TypeReference<List<Integer>>(){});
```
三、Jackson
https://blog.csdn.net/u011054333/article/details/80504154
  依赖
```html
<properties> 
    <jackson.version>1.9.13</jackson.version>
</properties> 
<dependencies>
<!-- json和bean之间相互转换 --> 
    <dependency>
        <groupId>org.codehaus.jackson</groupId> 
        <artifactId>jackson-core-asl</artifactId>
        <version>${jackson.version}</version>
    </dependency>
    <dependency>
<groupId>org.codehaus.jackson</groupId> <artifactId>jackson-mapper-asl</artifactId> <version>${jackson.version}</version>
</dependency> </dependencies>
```

```
相比json-lib框架，Jackson所依赖的jar包较少，简单易用并且性能也要 相对高些。而且Jackson社区相对比较活跃，更新速度也比较快。 Jackson对于复杂类型的json转换bean会出现问题，一些集合Map， List的转换出现问题。Jackson对于复杂类型的bean转换Json，转换的 json格式不是标准的Json格式。
当javabean对象中如果有Date类型字段，那么转换成json 就变成了时 间戳格式，这是不希望看到的
@JsonFormat(pattern = “yyyy-MM-dd”) :按此格式格式化这 个字段
可以在类的getter方法上添加注解: org.codehaus.jackson.annotate.JsonIgnore在转换时忽略该属 性。
     
                 使用步骤
 1.导入jackson的相关jar包 jackson-annotations-2.2.3.jar，jackson-core-2.2.3.jar，
jackson-databind-2.2.3.jar 2.创建jackson核心对象 ObjectMapper 3.调用ObjectMapper的相关方法进行转换
转换方法: 1.writeValue(参数1，obj)
参数1说明: File:将obj对象转换为JSON字符串，并保存到指定
的文件中
Writer:将obj对象转换为JSON字符串，并将json数 据填充到字符输出流中
OutputStream:将obj对象转换为JSON字符串，并 将json数据填充到字节输出流中
2.writeValueAsString(obj):将对象转换为json字符串
(1)简单映射:java对象<--->字符串,文件,字节数组( 字节流) 我们用Lombok设置一个简单的Java类。
@Data @AllArgsConstructor @NoArgsConstructor public class Friend {
private String nickname;
private int age; }
    ObjectMapper mapper = new ObjectMapper();

                ObjectMapper mapper = new ObjectMapper();
  Friend friend = new Friend("yitian", 25);
//java对象---->字符串，文件，字节流 // 写为字符串
String text = mapper.writeValueAsString(friend); // 写为文件
mapper.writeValue(new File("friend.json"), friend); // 写为字节流
byte[] bytes = mapper.writeValueAsBytes(friend); System.out.println(text);
//字符串---->java对象 // 从字符串中读取
Friend newFriend = mapper.readValue(text, Friend.class); // 从字节流中读取
Friend newFriend = mapper.readValue(bytes, Friend.class); // 从文件中读取
Friend newFriend = mapper.readValue(new File("friend.json"), Friend.class);
System.out.println(newFriend);
(2)复杂映射:java集合<--->字符串--->JsonNode ObjectMapper mapper = new ObjectMapper(); Map<String, Object> map = new HashMap<>(); map.put("age", 25);
map.put("name", "yitian");
map.put("interests", new String[]{"pc games", "music"}); String text = mapper.writeValueAsString(map); System.out.println(text);
   
                Map<String, Object> map2 = mapper.readValue(text, new TypeReference<Map<String, Object>>() {});
System.out.println(map2); //这里text假如是List的json串时，这样读取 List<Object> list= mapper.readValue(text, new TypeReference<List<Object>>() {});
JsonNode root = mapper.readTree(text); String name = root.get("name").asText(); int age = root.get("age").asInt();
System.out.println("name:" + name + " age:" + age);
四、json-lib
json-lib最开始的也是应用最广泛的json解析工具，json-lib 不好的地方 确实是依赖于很多第三方包，包括commons-beanutils.jar,commons- collections.jar,commons-lang.jar,commons-logging.jar,ezmorph- 1.0.6.jar,对于复杂类型的转换，json-lib对于json转换成bean还有缺陷， 比如一个类里面会出现另一个类的list或者map集合，json-lib从json到 bean的转换就会出现问题。
json-lib在功能和性能上面都不能满足现在互联网化的需求。
     
                  <dependency> <groupId>net.sf.json-lib</groupId> <artifactId>json-lib</artifactId> <version>2.4</version> <classifier>jdk15</classifier>
</dependency>
使用
//json-lib的使用
RiemannUser riemannUser = new RiemannUser(); riemannUser.setId(1);
riemannUser.setMessage("Hello JSONObject"); SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String date = sdf.format(new Date()); riemannUser.setSendDate(date);
//java对象转JSONObject对象 JSONObject jsonObject = JSONObject.fromObject(riemannUser); int id = jsonObject.getInt("id");
String message = jsonObject.getString("message");
//java对象转json字符串
JSONObject jsonObject = JSONObject.fromObject(riemannUser); String str = jsonObject.toString();
    //JSONObject对象转json字符串

                //JSONObject对象转json字符串
  String jsonString = jsonObject.toString(); System.out.println(jsonString);
运行结果:
{"id":1,"intList":[],"message":"Hello JSONObject","nodeName":"","sendDate":"2019-07-03 23:59:32"}
//JSONObject对象转java对象
JSONObject jsonObject = JSONObject.fromObject("json串"); RiemannUser user = JSONObject.toBean(jsonObject,RiemannUser.class);
json字符串转JSONObject对象
JSONObject jsonObject = JSONObject.fromObject("json串");
json字符串转Java对象
JSONObject jsonObject = JSONObject.fromObject("json串"); RiemannUser user = JSONObject.toBean(jsonObject,RiemannUser.class);
json字符串转任意所需类型
Object object= JSONObject.toBean(json串,new TypeReference<Object>(){},false);
List<Object> list = JSONObject.toBean(json串,new TypeReference<List<Object>>(){},false);
Se<Object> list = JSONObject.toBean(json串,new TypeReference<Set<Object>>(){},false); Map<String,Object> map= JSONObject.toBean(json串,new TypeReference<Map<String,Object>>(){},false); List<Map<String,Object>> = JSONObject.toBean(json串,new TypeReference<List<Map<String,Object>>>(){},false);
   
                  //fastjson使用
RiemannUser riemannUser = new RiemannUser(); riemannUser.setId(1);
riemannUser.setMessage("Hello JSONObject"); SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String date = sdf.format(new Date()); riemannUser.setSendDate(date);
//Java对象转json字符串
String jsonString = JSONObject.toJSONString(riemannUser); System.out.println(jsonString);
运行结果:
{"id":1,"message":"Hello JSONObject","sendDate":"2019-07-04 00:01:55"}
1
//对比 //json-lib和fastjson打印结果不同，会打印对象的所有属性，不管 属性是否有值，而fastjson只打印有值的属性。
五、总结
综上4种Json技术的比较，在项目选型的时候可以使用Google的Gson和 阿里巴巴的FastJson两种并行使用，如果只是功能要求，没有性能要 求，可以使用google的Gson，如果有性能上面的要求可以使用Gson将 bean转换json确保数据的正确，使用FastJson将Json转换Bean。

六、一些概念
JSON对象
json对象(JsonObject)和json串的区别就两点，第一点是否能调 用方法，第二点是否带引号
定义
1、数据在花括号中 2、数据以"键:值"对的形式出现(其中键多以字符串形式出现，值 可取字符串，数值，甚至其他json对象) 3、每两个"键:值"对以逗号分隔(最后一个"键:值"对省略逗号) 4、遵守上面3点，便可以形成一个json对象。
{
"ID": 1001,
"name": "张三",
"age": 24
}
JSON对象数组
      
1、数据在方括号中(可理解为数组) 2、方括号中每个数据以json对象形式出现 3、每两个数据以逗号分隔(最后一个无需逗号) 4、遵守上面3点，便可形成一个json对象数组(及一个数组中，存 储了多个json对象)
[
{"ID": 1001, "name": "张三", "age": 24}, {"ID": 1002, "name": "李四", "age": 25}, {"ID": 1003, "name": "王五", "age": 22}
]
JSON对象和JSON对象数组结合
 这是上面两个基本形式结合出来的一种变形，通过这种变形，使得 数据的封装具有很大的灵活性，能让开发者自由的发挥想象力。
{
"部门名称":"研发部",
"部门成员":[
{"ID": 1001, "name": "张三", "age": 24}, {"ID": 1002, "name": "李四", "age": 25}, {"ID": 1003, "name": "王五", "age": 22}], "部门位置":"xx楼21号"
}
   
JSON字符串
 1、它必须是一个字符串，由" "或者' '包裹数据，支持字符串的各种 操作。和java字符串一样，只是格式是json格式的。 2、里面的数据格式应该要满足其中一个格式，可以是json对象，也 可以是json对象数组或者是两种基本形式的组合变形的格式。即 json字符串必须是json对象或json对象数组或两者组合的这种格 式。
"{
\"部门名称\":\"研发部\",
\"部门成员\":[{\"ID\": 1001, \"name\": \"张三\", \"age\": 24},
{\"ID\": 1002, \"name\": \"李四\", \"age\": 25},
{\"ID\": 1003, \"name\": \"王五\", \"age\": 22}], \"部门位置\":\"xx楼21号\"
}"
```
七、SpringMVC——处理 JSON:使用 HttpMessageConverter
```
一、SpringMVC处理JSON流程 
1. 加入 jar 包: jackson-annotations-2.1.5.jar jackson-core-2.1.5.jar jackson-databind-2.1.5.jar
2. 编写目标方法，使其返回 JSON 对应的对象或集合
3.在方法上添加 @ResponseBody 注解 /**@ResponseBody 输出处理(json,string)
将内容或对象作为 HTTP 响应正文返回，使用@ResponseBody 将会跳过视图处理部分，而是调用适合HttpMessageConverter， 将返回值写入输出流。
* 测试返回Json串 * @param map
* @return
*/
@ResponseBody
@RequestMapping("/testJson")
public List<Employee> testJson(Map<String ,Object> map){
return employeeService.getAllEmps(); }
4.页面Js
<script type="text/javascript"> $(function(){
$("#testjson").click(function(){ var url = this.href;
var args = {}; $.post(url,args,function(date){
for(var i=0;i<=date.length;i++){ var id = date[i].id;
var lastName = date[i].lastName; alert(id+":"+lastName);
} })
   
                  return false; })
}); </script>
二、HttpMessageConverter
HttpMessageConverter 是 Spring3.0 新添加的一个接 口，负责将 请求信息转换为一个对象(类型为 T)，将对象( 类型为 T)输出 为响应信息
使用 HttpMessageConverter 将请求信息转化并绑定到处理方法的 入 参中或将响应结果转为对应类型的响应信息，Spring 提供了两种 途径:
使用 @RequestBody / @ResponseBody 对处理方法进行标注 使用 HttpEntity / ResponseEntity 作为处理方法的入参或返回值
  /**
* 测试使用ResponseEntity进行文件下载 * @param session
* @return
* @throws IOException
*/
@RequestMapping("/testResponseEntity")
public ResponseEntity<byte[]> testResponseEntity(HttpSession session) throws IOException {
byte [] body = null;
ServletContext servletContext = session.getServletContext();
InputStream in =
   
                  servletContext.getResourceAsStream("/WEB- INF/pages/list.jsp");
body = new byte[in.available()]; in.read(body);
// 设置响应头
HttpHeaders headers = new HttpHeaders(); headers.add("Content-Disposition",
"attachment;filename=list.jsp"); //设置响应状态码
HttpStatus statusCode = HttpStatus.OK;
ResponseEntity<byte[]> response = new ResponseEntity<byte[]>(body, headers, statusCode);
return response; }
  当控制器处理方法使用到 @RequestBody/@ResponseBody 或 HttpEntity/ResponseEntity 时, Spring 首先根据请求头或响应头 的 Accept 属性选择匹配的 HttpMessageConverter, 进而根据参 数类型或 泛型类型的过滤得到匹配的 HttpMessageConverter, 若 找不到可用的 HttpMessageConverter 将报错 @RequestBody 和 @ResponseBody 不需要成对出现
三、源码分析
HttpMessageConverter 的实现类
调试进入 org.springframework.web.servlet.DispatcherServlet.class 查看DispathcherServlet(this)的handlerAdapters 查看handlerAdapters下的 messageConverters DispatcherServlet 默认装配 RequestMappingHandlerAdapter ， 加入 jackson jar 包后， RequestMappingHandlerAdapter 装配的 HttpMessageConverter 如下:
   i f kh j M i J k 2H

               org.springframework.http.converter.json.MappingJackson2Http MessageConverter
      
              
```