package com.bjknrt.dtx.metrics

import com.baomidou.mybatisplus.generator.AutoGenerator
import com.baomidou.mybatisplus.generator.config.DataSourceConfig
import com.baomidou.mybatisplus.generator.config.GlobalConfig
import com.baomidou.mybatisplus.generator.config.PackageConfig
import com.baomidou.mybatisplus.generator.config.StrategyConfig
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine



    fun main(args: Array<String>) {
        // ================= 必须修改的配置 start =================

        // 数据源配置
        val jdbcUrl =
            "jdbc:mysql://127.0.0.1:3306/metrics?useUnicode=true&characterEncoding=UTF-8&useSSL=false&jdbcCompliantTruncation=false&zeroDateTimeBehavior=convertToNull"
        val jdbcDriver = "com.mysql.jdbc.Driver"
        val jdbcUsername = "root"
        val jdbcPassword = "root"

        // 父级包名配置
        val parentPackage = "com.bjknrt.dtx.metrics"

        // 生成代码的 @author 值
        val author = "hangm"

        // 要生成代码的表名配置
        val tables = arrayOf(
            "log_metrics"
        )

        // ================= 必须修改的配置 end =================
        val mpg = AutoGenerator()
        // 全局配置
        val gc: GlobalConfig =
            GlobalConfig()
        val projectPath = System.getProperty("user.dir")
        gc.setOutputDir("$projectPath/metrics/metrics-server/src/main/java")
        gc.setAuthor(author)
        gc.setBaseResultMap(true)
        gc.setBaseColumnList(true)
        // 生成完毕后是否打开输出目录
        gc.setOpen(false)
        // 为true时生成entity将继承Model类，单类即可完成基于单表的业务逻辑操作，按需开启
        gc.setActiveRecord(false)
        mpg.setGlobalConfig(gc)

        // 数据源配置
        val dsc = DataSourceConfig()
        dsc.setUrl(jdbcUrl)
        dsc.setDriverName(jdbcDriver)
        dsc.setUsername(jdbcUsername)
        dsc.setPassword(jdbcPassword)
        mpg.setDataSource(dsc)

        // 包配置
        val pc = PackageConfig()
        // 父级包名，按需修改
        pc.setParent(parentPackage)
        // 设置模块名, 会在parent包下生成一个指定的模块包
        pc.setModuleName(null)
        //创建实体类包名
        pc.setEntity("entity")
        //Controller 控制层包名
        pc.setController("controller")
        //创建业务层接口的所在包名
        pc.setService("service")
        //创建实现类的所在包名
        pc.setServiceImpl("service.impl")
        //Mapper Dao层的接口所在包名
        pc.setMapper("mapper")
        mpg.setPackageInfo(pc)


        // 策略配置
        val strategy = StrategyConfig()
        strategy.setNaming(NamingStrategy.underline_to_camel)
        strategy.setColumnNaming(NamingStrategy.underline_to_camel)
        strategy.setRestControllerStyle(false)
        strategy.setInclude(*tables)
        strategy.setSuperEntityColumns("id")
        // Controller驼峰连字符，如开启，则requestMapping由 helloWorld 变为 hello-world 默认false
        strategy.setControllerMappingHyphenStyle(false)
        strategy.setTablePrefix(pc.getModuleName() + "_")
        // 开启后将使用lombok注解代替set-get方法，false则生成set-get方法
        strategy.setEntityLombokModel(true)
        // 在实体类中移除is前缀
        strategy.setEntityBooleanColumnRemoveIsPrefix(true)
        mpg.setStrategy(strategy)
        mpg.setTemplateEngine(FreemarkerTemplateEngine())
        mpg.execute()
    }
