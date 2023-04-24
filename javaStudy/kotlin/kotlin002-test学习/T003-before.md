```
@BeforeEach
fun before() {
    // 获取mockmvc对象实例
    mvc = MockMvcBuilders
        .webAppContextSetup(webApplicationContext)
        .defaultResponseCharacterEncoding<DefaultMockMvcBuilder>(Charset.forName("UTF-8"))
        .build()
    changeCurrentUser(
        JwtUserDetails(
            BigInteger.ONE,
            Date(),
            Date(),
            Date(),
            userId,
            "nickName",
            true,
            "loginName",
            setOf(),
            setOf(BigInteger.ONE)
        )
    )

    Mockito.doNothing().`when`(healthSchemeClockInClient).saveClockIn(any())
    Mockito.doAnswer {
        val mutableListOf = mutableListOf<ListSimpleInfoByIdsParamInner>()
        val bigIntegers = it.arguments[0] as List<Id>
        for (i in 0..bigIntegers.size) {
            mutableListOf.add(ListSimpleInfoByIdsParamInner(bigIntegers[i], "lo", "name$i"))
        }
        return@doAnswer mutableListOf
    }.`when`(userClient).listSimpleInfoByIds(any())

}
```

```

// 1.3 校验重复添加
val addIdentityResponse3 = restTemplate.postForEntity("/auth/addIdentity", addParams, ExceptionResult::class.java)
Assertions.assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, addIdentityResponse3.statusCode)
Assertions.assertEquals(AppSpringUtil.getMessage("mrs.find-data"), addIdentityResponse3.body?.message)

Assertions.assertEquals(KatoBusinessException::class.java.name,addIdentityResponse3.body?.exception)

```