# 常用cn.hutool.core.io包下的类
## IoUtil类 
### copy方法，文件的拷贝
```
BufferedInputStream in = FileUtil.getInputStream("E:\\new\\a.txt"); 
BufferedOutputStream out = FileUtil.getOutputStream("E:\\new\\b.txt"); 
long copySize = IoUtil.copy(in, out);
System.out.println(copySize);
```
- 上述copy方法的注意项 
- 上面copy方法的返回值copySize指的是a.txt文件内容的大小，
- 如果该文件的内容是“123abc”的话，那么copySize的值就是6。
- 如果内容中有中文的话，由于编码不同，中文占的长度不一样，所以包含中文时不同编码环境下copySize的值会不一样。 
- 使用copy方法进行文件拷贝时，也是可以指定缓存区大小的
- 比如IoUtil.copy(in,out,1024)就是指缓存区的大小是1024，不指定的话默认是8192。

## FileReader类和FileWriter类，进行文件的读写
```
//默认UTF-8编码，可以在构造中传入第二个参数来自定义编码方式 
FileReader fileReader = new FileReader("E:\\new\\a.txt"); 
String result = fileReader.readString(); 
System.out.println(result);

//默认UTF-8编码，可以在构造中传入第二个参数来自定义编码方式 
FileWriter writer = new FileWriter("E:\\new\\b.txt");
String str = "test123测试使用sdfghj";
writer.write(str);
```
## ResourceUtil类，进行项目中的文件读取 假设我们的文件存放在src/resources/config目录下，则读取的代码如下所示
```
String str = ResourceUtil.readUtf8Str("config/abc.txt"); 
System.out.println(str);
```
注意项:
ResourceUtil中最核心的方法是getResourceObj，此方法可以根据传入路径是否为绝对路径而返 回不同的实现。
比如路径是:file:/opt/test，或者/opt/test都会被当作绝对路径，此时内部会调用 FileResource来读取数据，
如果不满足以上条件，默认调用ClassPathResource读取classpath中 的资源或者文件。
需要注意的是，在IDEA中新加入文件到src/resources目录下，需要重新import项目，
以便在编译 时顺利把资源文件拷贝到target目录下。如果提示找不到文件，请去target目录下确认文件是否存在;
如果需要自定义编码方式进行文件的读取，可以使用ResourceUtil类中的readStr方法，该方法的 第二个参数可以传入自定义的编码。

## 常用类cn.hutool.setting.dialect.Prop类
- 假设我们想要读取src/resources目录下的properties文件内容，比如log4j.properties文件，那么代码如下
```
//默认ISO-8859-1编码，可以在构造中传入第二个参数来自定义编码方式 
Props props = new Props("log4j.properties");
String str = props.getStr("log4j.appender.console"); 
System.out.println(str);
```

- 注意项:
1. Props类继承自Properties，所以可以兼容Properties类;
2. 如果我们想要根据properties文件中的key值获取对应的value值，直接调用Props类的 getStr方法即可

## 常用cn.hutool.core.util包下的类
1. StrUtil工具类 hasBlank方法、isAllNotBlank方法
- 这两个方法的参数都是可变参数，也就是说，它们都是可以同时校验多个字符串的，
- 由于 isAllNotBlank(CharSequence... args)方法的底层就是!hasBlank(CharSequence... strs)，
- 所以这 里只介绍一个方法即可，就说说isAllNotBlank(CharSequence... args)方法吧。

```
boolean test1 = StrUtil.isAllNotBlank("123","test"); 
System.out.println(test1);//运行结果:true

boolean test2 = StrUtil.isAllNotBlank(); 
System.out.println(test2);//运行结果:false

boolean test3 = StrUtil.isAllNotBlank("123","test",""); 
System.out.println(test3);//运行结果:false

boolean test4 = StrUtil.isAllNotBlank("123","test"," "); 
System.out.println(test4);//运行结果:false

boolean test5 = StrUtil.isAllNotBlank("123","test",null); 
System.out.println(test5);//运行结果:false

boolean test6 = StrUtil.isAllNotBlank("123","test","",null); 
System.out.println(test6);//运行结果:false

boolean test7 = StrUtil.isAllNotBlank("123","test","\n"); 
System.out.println(test7);//运行结果:false
```

注意:这里的isAllNotBlank方法在校验入参中的多个字符串时，只要有一个不满足要求，就会返 回false。
hasEmpty方法和isAllNotEmpty方法，
这两个方法的参数也都是可变参数，所以也都是可以同时校验多个字符串的，
由于 isAllNotEmpty(CharSequence... args)方法的底层就是!hasEmpty(CharSequence... strs)，
所以 这里只介绍一个方法即可，就说说isAllNotEmpty(CharSequence... args)方法吧。

```
boolean test1 = StrUtil.isAllNotEmpty("123","test"); 
System.out.println(test1);//运行结果:true

boolean test2 = StrUtil.isAllNotEmpty(); 
System.out.println(test2);//运行结果:false

boolean test3 = StrUtil.isAllNotEmpty("123","test",""); 
System.out.println(test3);//运行结果:false

boolean test4 = StrUtil.isAllNotEmpty("123","test"," "); 
System.out.println(test4);//运行结果:true

boolean test5 = StrUtil.isAllNotEmpty("123","test",null); 
System.out.println(test5);//运行结果:false

boolean test6 = StrUtil.isAllNotEmpty("123","test","",null); 
System.out.println(test6);//运行结果:false

boolean test7 = StrUtil.isAllNotEmpty("123","test","\n"); 
System.out.println(test7);//运行结果:true
```

注意:这里的isAllNotEmpty方法和上面isAllNotBlank方法的最大区别就是，
isAllNotEmpty方法 认为" "和"\n"不算空，所以即便参数中包含了它们，也会返回true。
所以我认为相对来说 isAllNotBlank方法校验的更全面一点。
format方法
这里先使用字符串模板代替字符串进行拼接，然后再使用具体值进行填充。
format方法的可变参 数是Object类型的，所以传具体值来替换模板时，是可以传任意类型的，并不仅仅局限于字符串 类型。
```
String template = "{}爱{}，就像老鼠爱大米";
String str = StrUtil.format(template, "我", "你"); 
System.out.println(str);//运行结果:我爱你，就像老鼠爱大米
```
### ZipUtil工具类 unzipFileBytes方法
获取压缩包中的指定文件
String path = "E:\\new\\mmall.war"; //读取mmall.war压缩包中index.jsp文件的内容
byte[] bytes = ZipUtil.unzipFileBytes(path, "index.jsp"); 
String text = new String(bytes); System.out.println(text);

注意项
(1)这里的unzipFileBytes方法的第一个参数除了可以传字符串形式的路径外，也可以传入一个 File类型，只需要调用unzipFileBytes(File zipFile, String name)方法即可;
(2)在读取压缩包文件内容的时候是可以自定义编码方式的，调用unzipFileBytes(String zipFilePath, Charset charset, String name)方法即可，这里的第二个参数用于设置编码，第三个 参数是压缩包里文件的文件名;
(3)对于zip包、war包以及jar包，unzipFileBytes方法都是可以成功解析的，tar包好像不行; 上面那个index.jsp文件如果是在mmall.war的mmall目录里，一定要带上目录名，即写 成“mmall/index.jsp”;
(4)上面byte[]数组转String的时候，我是直接通过构造方法new的一个String对象，这里通过构 造方法把byte[]数组转成String的时候，也是可以指定编码的，比如String text = new String(bytes,"UTF-8")这样。

unzipFileBytes方法 打包成压缩包，到当前目录
注意:这种方式虽然既能打包文件也能打包文件夹，但只能打包到当前目录，且打包后的压 缩包的名字就是目录名，像这类的目录是"E:\new\demo"，那么生成的压缩包的名字就只能 是demo.zip。
//将"E:\new\demo"目录下的所有内容打包到"E:\new\demo.zip"文件中 
File file = ZipUtil.zip("E:\\new\\demo"); 
System.out.println(file.getName());//运行结果:demo.zip

指定打包后的文件名及保存的目录
//将"E:\new\demo"目录下的所有内容打包到"E:\new\test\abc.zip"文件中 
File file = ZipUtil.zip("E:\\new\\demo","E:\\new\\test\\abc.zip"); 
System.out.println(file.getName());//运行结果:abc.zip

注意
(1)这里zip方法的第二个参数必须为文件，不能为目录; 
(2)这里zip方法的第二个参数的压缩包的名字可以和"demo"目录名相同，也可以不同; 
(3)这里zip方法的第二个参数的“test”目录可以存在也可以不存在，存在的话压缩包就直接放 到该目录中，不存在的话就先创建该目录，然后再把压缩包放入其中。

可以选是否包含被打包的目录

//将"E:\new\demo"目录下的所有文件打包到"E:\new\test\abc.zip"文件中，并且abc.zip中的 所有文件都是带着demo这个目录的。
File file = ZipUtil.zip("E:\\new\\demo","E:\\new\\test\\abc.zip",true); 
System.out.println(file.getName());//运行结果:abc.zip

注意
这里调用的是带有三个参数的zip方法，第三个参数为true的话，表示在打包的时候，会连目录一 并打包进压缩包中。
我们这里要打包的是"E:\new\demo"目录下的所有文件，使用第三个参数为 true的zip方法的话，当我们打开abc.zip压缩包的时候，
压缩包里是包含demo目录的，进入这个 目录里面后才能看到该目录下的所有文件。
如果这里使用的是两个参数的zip方法，那么当我们打 开abc.zip压缩包的时候，压缩包里是不包含demo目录的，
我们直接看到的就是demo目录中的所 有文件。
选择多个文件或目录进行打包
//将"E:\new"目录下的多个文件及文件夹打包到"E:\new\abc.zip"文件中 
File file = ZipUtil.zip(FileUtil.file("E:\\new\\abc.zip"), true,
FileUtil.file("E:\\new\\log"), FileUtil.file("E:\\new\\b.txt"), FileUtil.file("E:\\new\\homework"));
System.out.println(file.getName());//运行结果:abc.zip

unzip方法 压缩包的解压
//将"E:\new\abc.zip"压缩包解压到"E:\new\test"目录下，返回值是解压到的目录名 
File file = ZipUtil.unzip("E:\\new\\abc.zip","E:\\new\\test"); 
System.out.println(file.getName());//运行结果:test


### 常用cn.hutool.cron包下的类
1. CronUtil工具类 schedule方法

对于一个maven项目，默认情况下会从src/main/resources/config/cron.setting中获取定时规则，
如果没在项目中添加该配置文件的话，也可以调用CronUtil类的schedule(String schedulingPattern, Task task)方法获取定时规则;

如果想让执行的作业同定时任务线程同时结束，可以将定时任务设为守护线程，即调用 CronUtil.start(true)方法开启线程。
需要注意的是，此模式下会在调用stop时立即结束所有作业 线程，所以要确保你的作业可以被中断。
```
public class HutoolTest {
    public static int i=1;
    public static void main(String[] args){
        //表示支持秒级别的定时任务 
        CronUtil.setMatchSecond(true); 
        CronUtil.schedule("* * * * * ?", new Task() {
            @Override
            public void execute() {
                CronTest.run();
            }
        });
        CronUtil.start();
    }
    public static void run(){
        System.out.println("测试执行情况--->"+(i++));
        if(i>10){
            CronUtil.stop();
        }
    }
}
```
```html
测试执行情况--->1 
测试执行情况--->2 
测试执行情况--->3 
测试执行情况--->4 
测试执行情况--->5 
测试执行情况--->6 
测试执行情况--->7 
测试执行情况--->8 
测试执行情况--->9 
测试执行情况--->10

```
