# 常用cn.hutool.json包下的类
## JSONUtil工具类
JSONUtil类中包含了String、javaBean以及JSONObject三者之间相互转换的方法，JSONArray相关 的转换也有，
由于我常用的是com.alibaba.fastjson包下的类和方法来实现它们之间的相互转换，所以 这里就不多说了。
这里主要想介绍一下xml格式的字符串和json串之间的相互转换，以及从文件中读取 json串的一些方法。

## xmlToJson方法，xml转json串

```
String xmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + "<DayFlowInfoQryReq>\n" +
" <IDType>12</IDType>\n" +
" <IDItemRange>13567895432</IDItemRange>\n" +
" <BizType>01</BizType>\n" +
" <POCont>\n" +
" <BooleanTest>true</BooleanTest>\n" +
" <OprTime>20210103161025</OprTime>\n" +
" </POCont>\n" +
" <IdentCode>3240ad5b9b43a</IdentCode>\n" + "</DayFlowInfoQryReq>";
String jsonStr = JSONUtil.xmlToJson(xmlStr).toStringPretty();
System.out.println(jsonStr);
```
//打印结果
```json
{
    "DayFlowInfoQryReq": {
        "IDItemRange": 13567895432, "BizType": "01",
        "POCont": {
            "OprTime": 20210103161025,
            "BooleanTest": true
        },
        "IDType": 12,
        "IdentCode": "3240ad5b9b43a"
    }
}
```

注意项

1. 如果不想对转换后的json串进行格式化，那上面就不要调用toStringPretty方法，而是调用 toString方法;
2. 使用JSONUtil类中的xmlToJson方法进行转换的时候，会自动识别xml格式字符串中各节点 的内容，假设节点的值是数字型，那么转换后的json串的该节点就是数字型，如果有节点的值是 true或者false，转换后就是布尔型;
3. 我发现xmlToJson方法在转换时，对于0开头的数字型好像并不能识别，比如上面的BizType 节点，转换后该节点的值就是字符串类型，而没有像IDType等节点一样是数字型;
4. 如果我们想让转换后的json字符串中各节点的值都是字符串类型的话，JSONUtil类中暂时没 有方法可以满足要求， 
5. 但是cn.hutool.json.XML#toJSONObject(String string, boolean keepStrings)可以，只需toJSONObject方法的第二个参数为true即可。

## toXmlStr方法，json串转xml
```
String jsonStr = "{\n" +
    " \"DayFlowInfoQryReq\": {\n" +
    " \"IDItemRange\": 13567895432,\n" +
    " \"BizType\": \"01\",\n" +
    " \"POCont\": {\n" +
    " \"OprTime\": 20210103161025,\n" +
    " \"BooleanTest\": true\n" +
    " },\n" +
    " \"IDType\": 12,\n" +
    " \"IdentCode\": \"3240ad5b9b43a\"\n" +
    " }\n" + "}";
String xmlStr = JSONUtil.toXmlStr(new JSONObject(jsonStr)); 
System.out.println(xmlStr);
```
//运行结果，结果做了格式化
```html
<DayFlowInfoQryReq>
    <IDItemRange>13567895432</IDItemRange> 
    <BizType>01</BizType>
    <POCont>
        <OprTime>20210103161025</OprTime>
        <BooleanTest>true</BooleanTest> 
    </POCont>
    <IDType>12</IDType>
    <IdentCode>3240ad5b9b43a</IdentCode> 
</DayFlowInfoQryReq>
```
注意项

(1)json转xml的时候，json串是否是格式化的对结果无影响，上面代码是为了看的方便，所以才 使用了格式化的json串进行xml的转换;
(2)由于toXmlStr方法不能接收字符串类型参数，所以上面通过new的方式，把字符串转换成一 个JSONObject对象作为参数进行传递。
readJSONObject方法 读取文件中的JSON串
```jade
File file = new File("E:\\new\\test.json");
JSONObject jsonObject = JSONUtil.readJSONObject(file, Charset.forName("UTF-8")); 
System.out.println(jsonObject.toStringPretty())
```
test.json文件的内容
```json
{
  "DayFlowInfoQryReq": {
    "IDItemRange":13567895432,
    "BizType":"01",
    "POCont": {
      "OprTime":20210103161025,
      "BooleanTest":true,
      "ChinaTest":"中文测 试"
    },
    "IDType":"12",
    "IdentCode":"3240ad5b9b43a"
  }
}
```
readJSONObject方法的运行结果
```json

{
  "DayFlowInfoQryReq": {
      "IDItemRange": 13567895432, "BizType": "01",
      "POCont": {
        "OprTime": 20210103161025, 
        "ChinaTest": "中文测试", 
        "BooleanTest": true
      },
      "IDType": "12", 
      "IdentCode": "3240ad5b9b43a"
  }
}

```
readJSONArray方法，读取文件中的JSON数组，这里就不多说了