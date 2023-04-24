
# 常用cn.hutool.http包下的类
## HttpUtil工具类 模拟get请求
```
//最简单的HTTP请求，可以自动通过header等信息判断编码，不区分HTTP和HTTPS
String result1 = HttpUtil.get("http://learning.happymmall.com/centos.html");
System.out.println(result1);
//当无法识别页面编码的时候，可以自定义请求页面的编码
String result2 = HttpUtil.get("http://learning.happymmall.com/centos.html", CharsetUtil.CHARSET_UTF_8);
System.out.println(result2);

//可以单独传入http参数，这样参数会自动做URL编码，拼接在URL中
HashMap<String, Object> paramMap = new HashMap<String, Object>();
paramMap.put("city", "杭州");
String result3 = HttpUtil.get("https://www.baidu.com", paramMap);
System.out.println(result3);
```
模拟post请求
```
//发送请求体body到对应地址(可以是xml格式或者json格式的字符串，也可以是a=1&b=2这种格式 的字符串)
String result1= HttpUtil.post("https://www.baidu.com","{\"name\":\"123\",\"type\":\"abc\"}");
System.out.println(result1);
//发送post表单数据到对应地址
HashMap<String, Object> paramMap = new HashMap<String, Object>();
paramMap.put("name", "123");
paramMap.put("type", "abc");
String result2 = HttpUtil.post("https://www.baidu.com", paramMap);
System.out.println(result2);
```

无论是get方法还是post方法，都是可以在方法中传入超时时间这个参数的。
模拟文件上传
```
HashMap<String, Object> paramMap = new HashMap<>();
//文件上传只需将参数中的键指定(默认是file)，值设为文件对象即可，对于使用者来说，文件 上传与普通表单提交并无区别
paramMap.put("file", FileUtil.file("D:\\abc.jpg"));
String result = HttpUtil.post("https://www.baidu.com", paramMap);
System.out.println(result);
```
模拟文件下载

如果调用的是downloadFile(String url, File destFile, StreamProgress streamProgress)方法的 话，
可以通过重写第三个参数中的方法来感知下载进度。
```
String fileUrl = "http://learning.happymmall.com/nginx/linux-nginx-1.10.2.tar.gz";
//将文件下载后保存在E盘的new目录想，返回结果为下载文件的大小
long size = HttpUtil.downloadFile(fileUrl, FileUtil.file("E:\\new"));
System.out.println("size: " + size);//size: 910812
String strSize = FileUtil.readableFileSize(size);
System.out.println("readableFileSize: " + strSize);//readableFileSize: 889.46 kB
```