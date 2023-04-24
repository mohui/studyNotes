## 发送事件
```
package com.bjknrt.dtx.auth.event

import org.springframework.context.ApplicationEvent
import java.math.BigInteger

/**
 * 身份标识添加和注销事件
 */
data class IdentityEvent(
    val provider: Any,
    val status: AuthEventEventStatus,
    val id: BigInteger
) : ApplicationEvent(provider) {
}

enum class AuthEventEventStatus {
    /**
     * 添加
     */
    ADD,

    /**
     * 注销
     */
    CANCELLATION
}
```
## 监听事件
```
package com.bjknrt.dtx.auth.event.listener

import com.bjknrt.common.log.LOGGER
import com.bjknrt.common.util.AppIdUtil
import com.bjknrt.dtx.auth.event.AuthEventEventStatus
import com.bjknrt.dtx.auth.event.IdentityEvent
import com.bjknrt.dtx.auth.security.common.JwtAuthenticationConverter
import com.bjknrt.dtx.auth.security.common.JwtAuthenticationConverter.Companion.jwtSubjectToJwtStr
import com.bjknrt.dtx.auth.security.common.JwtAuthenticationToken
import com.bjknrt.dtx.auth.security.common.JwtSubject
import org.springframework.stereotype.Component
import org.springframework.transaction.event.TransactionalEventListener
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes

/**
 * 注册空账号后的监听器
 */
@Component
class IdentityInfoListener(
    private val jwtAuthenticationConverter: JwtAuthenticationConverter
) {

    /**
     * 注册空账号的监听处理
     */
    @TransactionalEventListener(classes = [IdentityEvent::class])
    fun identityListener(event: IdentityEvent) {
        if (event.status == AuthEventEventStatus.ADD) {
            try {
                //获取response
                val requestAttributes = RequestContextHolder.currentRequestAttributes() as ServletRequestAttributes
                val response = requestAttributes.response
                //准备数据
                val jwtId = AppIdUtil.nextId()
                val userId = event.id
                val subject = JwtSubject(jwtId = jwtId, userId = userId)
                //生成token
                val token = jwtSubjectToJwtStr(subject)
                //响应数据
                val authenticationToken = JwtAuthenticationToken(credentials = token, subject = subject)
                jwtAuthenticationConverter.responseAuthenticationToken(authenticationToken, response)
            } catch (e: Exception) {
                LOGGER.warn("监听异常：$event", e)
            }
        }
    }
}
```

## controller代码

```ts
/**
 * 新建成功发送新建事件
 * this: 规定的第一个参数
 * AuthEventEventStatus.ADD: 自己定义的参数,枚举
 * identityId: 自己定义的第二个参数
 */
AppSpringUtil.publishEvent(
    IdentityEvent(this, AuthEventEventStatus.ADD, identityId)
)
```

