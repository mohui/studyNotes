# 中间件学习
```javascript
// 引用
import {AuditLog} from '../middleware/audit-log';

export default class CheckAreaEdit {
    @AuditLog(async () => {
        const userId = Context.current.user.id;
        const checks = await appDB.execute(
          `select * from check_system where create_by = ?`,
          userId
        );
        const extra = {
          counts: checks.length
        };
        return {};
    })
    async helloTest() {
        return "hello word"
    }

    @AuditLog({
        module: '考核体系编辑模块',
        method: '考核机构绑定'
      })
    async test() {
    
    }
}
```
## 中间件代码
```javascript
import {Context} from '../context';
import {appDB} from '../../app';

/**
 * 审计注解符号
 */
const auditLogSymbol = Symbol('audit-log');

/**
 * 审计日志注解的对象参数
 */
type AuditLogModel = {
  module?: string; // 操作模块
  method?: string; // 操作方法
  extra?: JSON; // 操作具体属性
  user_id?: string; // 操作人id
  user_name?: string; // 操作人名称
};

/**
 * 审计日志注解的函数参数
 */
type AuditLogFunction = () => Promise<AuditLogModel>;

/**
 * 审计日志注解
 *
 * @param params 注解参数
 */
export function AuditLog(params: AuditLogFunction | AuditLogModel) {
  return function(target, propertyName) {
    if (typeof target[propertyName] !== 'function') {
      throw new Error('AuditLog 只能作用在函数上');
    }

    target[propertyName][auditLogSymbol] = params;
  };
}

/**
 * 审计日志中间件
 */
export async function AuditLogMiddleware(
  ctx: Context,
  next: Function
): Promise<void> {
  // 日志时间
  const now = new Date();
  // kato流程完成后
  await next();
  // 获取注解对象
  const auditLogObject = ctx.method.method[auditLogSymbol];
  // 用户登录且有注解
  if (ctx.user && auditLogObject) {
    // 注解对象判断; 其实不用判断, 因为ts有类型检查
    if (
      typeof auditLogObject !== 'function' &&
      typeof auditLogObject !== 'object'
    ) {
      throw new Error('AuditLog 参数错误');
    }
    try {
      // 审计日志对象
      let auditLogModel: AuditLogModel;
      // 函数参数, 则执行
      if (typeof auditLogObject === 'function') {
        auditLogModel = await auditLogObject();
      }
      // 对象参数, 直接赋值
      if (typeof auditLogObject === 'object') {
        auditLogModel = auditLogObject;
      }
      // 插入审计日志
      await appDB.execute(
        `insert into audit_log(time, user_id, user_name, module, method, extra) values (?, ?, ?, ?, ?, ?)`,
        now,
        auditLogModel.user_id ?? ctx.user.id,
        auditLogModel.user_name ?? ctx.user.name,
        auditLogModel.module ?? ctx.module.name,
        auditLogModel.method ?? ctx.method.name,
        JSON.stringify(auditLogModel.extra)
      );
    } catch (e) {
      // TODO: 等待统一的报警处理
      console.error(now, e);
    }
  }
}
```
##  创建表
```javascript

import {IMigration} from '../migrater';
import {ExtendedSequelize} from '../client';

export class AuditMigration {
  name = '审计日志功能';
  version = 36;

  async up(client: ExtendedSequelize): Promise<void> {
    await client.execute(`
      create table if not exists "audit_log"
      (
        "time"       timestamp with time zone not null default current_timestamp,
        "user_id"    varchar(36),
        "user_name"  varchar(255),
        "module"     varchar(255),
        "method"     varchar(255),
        "extra"      json,

        "created_at" timestamp with time zone not null default current_timestamp,
        "updated_at" timestamp with time zone not null default current_timestamp
      );
      comment on table "audit_log" is '审计表';
      comment on column "audit_log"."time" is '操作时间';
      comment on column "audit_log"."user_id" is '操作人id';
      comment on column "audit_log"."user_name" is '操作人名称';
      comment on column "audit_log"."module" is '操作模块';
      comment on column "audit_log"."method" is '操作功能';
      comment on column "audit_log"."extra" is '操作附加属性';
    `);
  }
}
```