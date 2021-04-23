# 删表语句
```
// DROP TABLE 表名;
DROP TABLE test;
```

# 创表语句
```sql

CREATE TABLE IF NOT EXISTS "test"
(
    "id"       VARCHAR(36) PRIMARY KEY,
    "test_name"     VARCHAR(50),
    "test_year"     VARCHAR(50),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
COMMENT ON COLUMN "test"."id" IS '主键id';
COMMENT ON COLUMN "test"."test_name" IS '名字';
COMMENT ON COLUMN "test"."test_year" IS '出生日期';
```
# 修改字段类型
```sql
// 把字符串类型改为数字类型
ALTER TABLE test ALTER COLUMN test_year TYPE integer USING (test_year::integer);
// 把数字类型改为字符串类型
ALTER TABLE test ALTER COLUMN test_year TYPE character varying(50) USING (test_year::character varying(50));
// flate 改为 numeric
ALTER TABLE area_budget ALTER COLUMN budget TYPE numeric(15,4) USING (budget::numeric(15,4));

```

# 插入

```sql
insert into test values('1','zhangsan','3');
insert into test values('2','zhangsan','3');
insert into test values('3','zhangsan','3');
```

##  查询插入
```sql
insert into "check_group"(
	select h.check_system,h.hospital, h.created_at, h.updated_at from "check_hospital"
)

```
