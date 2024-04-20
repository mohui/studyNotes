


## nginx.conf
> 1. server：定义虚拟主机或服务器块的配置。 
> 2. location：配置如何处理特定 URL 路径的请求。 
> 3. server_name：指定服务器名称，可以是域名、IP 地址或通配符。 
> 4. listen：指定服务器监听的端口号和 IP 地址。 
> 5. root：指定服务器的根目录，用于存放静态文件。 
> 6. index：指定默认的索引文件。 
> 7. try_files：用于指定 Nginx 查找文件的策略，通常用于处理静态文件请求。 
> 8. location /：默认的根路径配置。 
> 9. proxy_pass：用于配置反向代理到其他服务器。 
> 10. rewrite：用于配置 URL 重写规则。 
> 11. gzip：配置 Gzip 压缩。 
> 12. server_tokens：控制服务器响应中的版本信息是否显示。 
> 13. ssl：用于配置 SSL/TLS 设置，如证书和密钥路径。 
> 14. include：引入其他配置文件或模块。 
> 15. fastcgi、uwsgi、scgi：用于配置 FastCGI、uWSGI 和 SCGI 设置。 
> 16. limit_conn_zone、limit_req_zone：用于配置连接数和请求速率限制的内存区域。 
> 17. proxy_cache：用于配置反向代理的缓存。 
> 18. http2：启用 HTTP/2 协议支持。
```bash
# http：定义 HTTP 服务器的全局设置。
http {
  # 引入 MIME 类型映射配置文件，用于将文件扩展名映射到 MIME 类型。
  include       mime.types;
  # 如果没有匹配的 MIME 类型，将使用默认的 MIME 类型。
  default_type  application/octet-stream;
  # 指定访问日志的位置和格式。
#  access_log  logs/access.log  main;

  sendfile  on;
#  tcp_nopush     on;

#  keepalive_timeout  0;
  keepalive_timeout 65;
  
  server {
    listen       8000;
#    listen       somename:8080;
    server_name  www.whh1.com;
    
    location / {
        root   /Applications/phpstudy/WWW/whh;
        index  index.php index.html index.htm;
    }
  }

#  gzip  on;
  # 定义虚拟主机或服务器块的配置
#  server {
#    listen       80;
#    server_name  localhost;
#    
#    charset koi8-r;
#    
#    access_log  logs/host.access.log  main;

#    location / {
#        root   html;
#        index  index.html index.htm;
#    }

#    error_page  404              /404.html;
#    
#     redirect server error pages to the static page /50x.html
#    
#    error_page   500 502 503 504  /50x.html;
#    location = /50x.html {
#        root   html;
#    }

#    proxy the PHP scripts to Apache listening on 127.0.0.1:80
#    
#    location ~ \.php$ {
#      proxy_pass   http://127.0.0.1;
#    }

#    pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
#
#    location ~ \.php$ {
#        root           html;
#        fastcgi_pass   127.0.0.1:9001;
#        fastcgi_index  index.php;
#        fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
#        include        fastcgi_params;
#    }
#
#     deny access to .htaccess files, if Apache's document root
#     concurs with nginx's one
#
#    location ~ /\.ht {
#        deny  all;
#    }
#  }


#    another virtual host using mix of IP-, name-, and port-based configuration
#    
#    server {
#        listen       8000;
#        listen       somename:8080;
#        server_name  somename  alias  another.alias;
#        
#        location / {
#            root   html;
#            index  index.html index.htm;
#        }
#    }


#     HTTPS server
#
#    server {
#        listen       443 ssl;
#        server_name  localhost;
#
#        ssl_certificate      cert.pem;
#        ssl_certificate_key  cert.key;
#
#        ssl_session_cache    shared:SSL:1m;
#        ssl_session_timeout  5m;
#
#        ssl_ciphers  HIGH:!aNULL:!MD5;
#        ssl_prefer_server_ciphers  on;
#
#        location / {
#            root   html;
#            index  index.html index.htm;
#        }
#    }
include vhosts/*.conf;
     client_body_buffer_size 60k;
     client_body_timeout 60;
     client_header_buffer_size 64k;
     client_header_timeout 60;
client_max_body_size  50m;
     keepalive_requests 100;
     large_client_header_buffers 4 64k;
     reset_timedout_connection on;
     send_timeout 60;
     sendfile_max_chunk 512k;
     server_names_hash_bucket_size 256;
     error_page 400 /error/400.html;
     error_page 403 /error/403.html;
     error_page 404 /error/404.html;
     error_page 500 /error/500.html;
     error_page 501 /error/501.html;
     error_page 502 /error/502.html;
     error_page 503 /error/503.html;
     error_page 504 /error/504.html;
     error_page 505 /error/505.html;
     error_page 506 /error/506.html;
     error_page 507 /error/507.html;
     error_page 509 /error/509.html;
     error_page 510 /error/510.html;
}
```

## 虚拟主机
```bash

```