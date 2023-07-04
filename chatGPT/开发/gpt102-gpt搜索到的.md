# 没有测试,不知道对错
- 要在Kotlin中对接ChatGPT，你可以使用OpenAI GPT模型的API来进行交互。
```
import okhttp3.MediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import org.json.JSONObject

fun main() {
    val prompt = "Hello, how are you?"

    val apiKey = "<YOUR_API_KEY>"
    val apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions"

    val jsonBody = JSONObject()
        .put("prompt", prompt)
        .put("max_tokens", 50) // 设置返回的最大令牌数

    val requestBody = RequestBody.create(MediaType.parse("application/json"), jsonBody.toString())

    val request = Request.Builder()
        .url(apiUrl)
        .header("Authorization", "Bearer $apiKey")
        .post(requestBody)
        .build()

    val client = OkHttpClient()
    val response = client.newCall(request).execute()

    val responseBody = response.body()?.string()
    if (response.isSuccessful && !responseBody.isNullOrEmpty()) {
        val json = JSONObject(responseBody)
        val choices = json.getJSONArray("choices")
        if (choices.length() > 0) {
            val completion = choices.getJSONObject(0).getString("text")
            println("ChatGPT: $completion")
        } else {
            println("No completion available.")
        }
    } else {
        println("Failed to make the API request.")
    }
}
```

在上面的示例中，你需要将<YOUR_API_KEY>替换为你的OpenAI API密钥。
该代码使用OkHttp库发送POST请求到ChatGPT API，并将返回的响应解析为文本，并输出到控制台。

请确保你已经在build.gradle文件中添加了OkHttp库的依赖，例如：

## 包依赖
```
dependencies {
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.okhttp3:okhttp:4.9.1")
    implementation("com.squareup.okhttp3:logging-interceptor")
}
```
`com.squareup.retrofit2:retrofit:2.9.0`: Retrofit 是一个用于进行网络请求的类型安全的 RESTful 客户端库。
它简化了从服务器获取数据并与 REST API 进行交互的过程。这个坐标指定了 Retrofit 库的版本为 2.9.0。

`com.squareup.okhttp3:okhttp: OkHttp:4.9.1` 是一个高效的 HTTP 客户端库，用于发送 HTTP 请求和处理响应。
它提供了简单而强大的 API 来处理网络通信。

`com.squareup.okhttp3:logging-interceptor`: logging-interceptor 是 OkHttp 提供的一个拦截器，
用于在应用程序和服务器之间记录和打印网络请求和响应的日志。它对调试和排查网络问题非常有用。
这个坐标指定了 logging-interceptor 的版本，但未指定具体的版本号。
你需要将其替换为你想要使用的 logging-interceptor 版本号，与你选择的 OkHttp 版本兼容。




