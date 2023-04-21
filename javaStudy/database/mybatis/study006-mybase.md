## mybatis应用
- 针对于单表操作
### 标签
```xml
<resultMap id="BaseResultMap" type="com.bj.model.Student">
    <id column="id" jdbcType="INTEGER" property="id" />
    <result column="name" jdbcType="VARCHAR" property="name" />
    <result column="pass_word" jdbcType="VARCHAR" property="passWord" />
</resultMap>
```

#### resultMap 标签
- 当数据库中字段名称与实体类对象的属性名不一致时, 可以进行转换
- 当前查询的结果没有对应一个表的时候, 可以自定义一个结果集
```xml
<resultMap id="BaseResultMap" type="com.bj.model.Student"></resultMap>
```

#### id 标签
- id标签只能修饰主键字段
- column: 数据库中的字段名称
- property: 映射对象的属性名称
- jdbcType: 列在数据库中字段的类型(可以省略不写)
```xml
<id column="id" jdbcType="INTEGER" property="id" />
```

#### result 标签
- result: 除了主键以外的字段
- 如果数据库中字段名称由多个单词构成, 通过 myBatis 逆向工程生成的对象属性名称会按照驼峰命名法规则生成属性名称
- 数据库中字段名称由多个单词构成的时候必须使用_下划线分割
```xml
<result column="name" jdbcType="VARCHAR" property="name" />
```

#### sql 标签
- sql 语句片段, 将公共的部分抽取出来
```xml
<sql id = "Base_Column_list"> id, name, age</sql>
```

#### select 标签
- id: 必填
- parameterType: 可写可不写
```xml
<select id="selectByPrimaryKey" parameterType="java.lang.Integer" resultMap="BaseResultMap">
    select
    <include refid="Base_Column_list" />
    from student
    where id = #{id, jdbcType=INTEGER}
</select>
```

#### delete 标签
- id: 必填
- parameterType: 可写可不写
```xml
<delete id="selectByPrimaryKey" parameterType="java.lang.Integer" resultMap="BaseResultMap">
    delete from student
    where id = #{id, jdbcType=INTEGER}
</delete>
```

#### insert 标签
> trim: 拼接字符串
- prefix: 前缀
- suffix: 后缀
- suffixOverrides: 去掉多余的逗号
```xml
<insert id="insertSelective" parameterType="com.bjknrt.model.Student">
    insert into Student
    <trin prefix="(" suffix=")" suffixOverrides=",">
        <if test="id != null">
            id,
        </if>
    </trin>
    <trin prefix="values (" suffix=")" suffixOverrides=",">
        <if test="id != null">
            #{id, jdbcType=INTEGER}
        </if>
    </trin>
</insert>
```

#### update 标签
```xml
<update id="updateByPrimaryKey" parameterType="com.bjknrt.model.Student">
    update Student
    <set>
        <if test="name != null">
            name = #{name, jdbcType=VARCHAR},
        </if>
    </set>
    WHERE id = #{id, jdbcType=INTEGER}
</update>
```