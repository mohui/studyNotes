## 手机验证码测试
```
package com.bjknrt.dtx.auth

import com.aliyun.dysmsapi20170525.Client
import com.aliyun.dysmsapi20170525.models.SendSmsRequest
import com.aliyun.dysmsapi20170525.models.SendSmsResponse
import com.aliyun.dysmsapi20170525.models.SendSmsResponseBody
import com.bjknrt.dtx.auth.api.MobilePhoneVerifyApi
import com.bjknrt.dtx.auth.service.MobilePhoneVerify
import com.bjknrt.dtx.auth.vo.VerifyCodeEntity
import com.bjknrt.dtx.auth.vo.VerifyCodeType
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.mockito.ArgumentCaptor
import org.mockito.Mockito.doReturn
import org.mockito.kotlin.capture
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Import

@Import(TestConfig::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MobilePhoneVerifyTest {

    @MockBean
    lateinit var client: Client

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Autowired
    lateinit var api: MobilePhoneVerifyApi

    @Test
    fun generateVerifyCode() {
        val body = SendSmsResponseBody()
        body.setCode("OK")
        body.setMessage("OK")
        val response = SendSmsResponse()
        response.setBody(body)
        val verifyCodeEntity = VerifyCodeEntity(
            "13245678901",
            VerifyCodeType.LOGIN,
            null
        )

        val request: ArgumentCaptor<SendSmsRequest> = ArgumentCaptor.forClass(SendSmsRequest::class.java)
        doReturn(response).`when`(client).sendSms(capture(request))
        api.generateCode(verifyCodeEntity)
        Assertions.assertNotNull(request.value.templateParam)
        Assertions.assertEquals(verifyCodeEntity.phone, request.value.phoneNumbers)

        val param = objectMapper.readValue(
            request.value.templateParam,
            MobilePhoneVerify.SendSmsRequestTemplateParam::class.java
        )
        val result = api.verifyCode(
            VerifyCodeEntity(
                verifyCodeEntity.phone,
                VerifyCodeType.LOGIN,
                param.code
            )
        )
        Assertions.assertTrue(result)
    }
}
```

## 捕获参数
```
val param: ArgumentCaptor<AddOperationLogParam> = ArgumentCaptor.forClass(AddOperationLogParam::class.java)
Mockito.verify(operationLogClient).saveLog(capture(param))
Assertions.assertEquals(request.orgId, param.value.orgId)
Assertions.assertEquals(request.content, param.value.content)
```

## mock远程服务
```
Mockito.doReturn(
    PatientInfoResponse(
        id = personId,
        name = "name",
        gender = Gender.MAN,
        phone = "13111256325",
        idCard = "233265956415115465",
        birthday = LocalDateTime.now(),
        age = 18,
        hypertensionDiseaseTag = PatientTag.EXISTS,
        diabetesDiseaseTag = PatientTag.EXISTS,
        acuteCoronaryDiseaseTag = PatientTag.EXISTS,
        cerebralStrokeDiseaseTag = PatientTag.EXISTS,
        copdDiseaseTag = PatientTag.EXISTS
    )
).`when`(patientClient).getPatientInfo(personId)
```