# 删表语句
```sql
DROP TABLE 表名;
DROP TABLE test;
```
# 删除字段
> test表名, hello 字段名
```sql
alter table test drop column if exists hello;

```
# 创表语句
```sql

CREATE TABLE IF NOT EXISTS "test"
(
    "id"       VARCHAR(36) PRIMARY KEY,
    "year"          int,
    "test_name"     VARCHAR(50),
    "money"         numeric(15, 4)           default 0,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
COMMENT ON COLUMN "test"."id" IS '主键id';
COMMENT ON COLUMN "test"."test_name" IS '名字';
COMMENT ON COLUMN "test"."year" IS '年份';
COMMENT ON COLUMN "test"."money" IS '金额';
```

# 新增字段
```sql
-- 新增字段
ALTER  table his_work_item ADD COLUMN staffs varchar(255)[] DEFAULT null;
-- 字段备注
COMMENT ON COLUMN his_work_item."staffs" IS '关联员工';

```
# 修改字段类型
```sql
// 把字符串类型改为数字类型
ALTER TABLE test ALTER COLUMN test_year TYPE integer USING (test_year::integer);
// 把数字类型改为字符串类型
ALTER TABLE test ALTER COLUMN test_year TYPE character varying(50) USING (test_year::character varying(50));
// flate 改为 numeric
ALTER TABLE test ALTER COLUMN money TYPE numeric(15,4) USING (money::numeric(15,4));

```

```javascript
const add = `
    alter table 表名 add 要新增的字段 varchar(255)
`;
const del = `
    alter table 表名 drop 要删除的字段名
`
// 变更字段名
const update = `
    alter table 表名 rename 要变更的字段 to 变更后的字段名
`;
// 变更字段大小 比如把 varchar(255) 变为 varchar(100)
const update2 = `
    alter table 表名 alter 变更的字段名 type varchar(100)
`;
// 加索引
const index = `
    create index 字段名_index on 表名(字段名)
`;
// 删除索引
const delIndex = `
    drop index 索引名
`
```

# 插入

```sql
insert into test values('1','张三','3');
insert into test values('2','小张三','3');
insert into test values('3','校长三','3');
```

##  查询插入
```sql
insert into "check_group"(
	select h.check_system,h.hospital, h.created_at, h.updated_at from "check_hospital"
)

-- 新的插入方法
insert into staff_request(id, staff, area)
select new.* from (select ? as id, ? as staff, ? as area)new
left join staff_request old on old.staff = new.staff 
    and old.area = new.area and old.status = '待审核'
    where old.id is null
```
### postgreSql 的数组查询方法
```sql
select  * from role where permissions:: text[] <@ array[
    'user-index',
    'user-add',
    'user-update',
    'user-remove',
    'role-index',
    'appraisal-result'
];
```

# 修改语句

```javascript
const 修改本字段固定内容 = `
update test set test_name = replace(test_name, '.docx', '.pdf') where id is not null;
update test set test_name = replace(test_name, '.doc', '.pdf') where id is not null;
`;
const 本字段追加内容 = `update test set test_name = concat(test_name, '.docx') where id is not null`;


```

# 添加修改语句
```sql

insert into sms_code(phone, usage, code, created_at, updated_at)
values (?, ?, ?, ?, ?)
on conflict (phone, usage) do update
set counts     = ?,
code       = excluded.code,
created_at = excluded.created_at,
updated_at = excluded.updated_at;


insert into staff_area_mapping(id, staff, area)
values (?, ?, ?)
on conflict (staff, area)
  do update set updated_at = now()
```