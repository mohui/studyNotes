```sql
-- 数据库Schema描述文件, 执行DDL操作
# update hs_cerebral_stroke_leave_hospital_visit hospital set follow_date = hospital.created_at where follow_date = '0000-00-00 00:00:00';
#
# ALTER TABLE `hs_cerebral_stroke_leave_hospital_visit`
#     MODIFY COLUMN `follow_date` datetime(3) NOT NULL COMMENT '随访日期' AFTER `follow_way`;
#
# update hs_cerebral_stroke_visit stroke set follow_date = stroke.created_at where follow_date = '0000-00-00 00:00:00';
#
# ALTER TABLE `hs_cerebral_stroke_visit`
#     MODIFY COLUMN `follow_date` datetime(3) NOT NULL COMMENT '随访日期' AFTER `follow_way`;
```


```
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.util.StringUtils
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

@SpringBootApplication
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}

@Controller
class UploadController {

    @PostMapping("/upload")
    @ResponseBody
    fun handleFileUpload(@RequestParam("file") file: MultipartFile): ResponseEntity<String> {
        if (file.isEmpty) {
            return ResponseEntity.badRequest().body("No file uploaded")
        }

        val fileName = StringUtils.cleanPath(file.originalFilename!!)
        val uploadDir = "/path/to/uploads" // 指定上传文件的目录

        try {
            val path: Path = Paths.get(uploadDir).resolve(fileName)
            Files.copy(file.inputStream, path)

            return ResponseEntity.ok().body("File uploaded successfully")
        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file")
        }
    }
}

```