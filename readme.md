# Start development

```bash
npm start
```

# Build and git publish

```bash
npm run build
npm run git.publish
```

# NginX config sample

```bash
pm2 start /project/dist/ssr
```

Start SSR(Server side rendering) server 

```
server {
  set $STATIC_FILES /project/dist/web;
  set $SSR_PORT 4100;

  listen       9100;
  server_name  localhost;

  # SSR proxy
  location / {
    proxy_redirect off;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_set_header Connection "";
    proxy_http_version 1.1;

    proxy_pass http://127.0.0.1:$SSR_PORT;
  }

  # Static files
  location ~ ^/(.*)\.(.*)$ {
    root $STATIC_FILES;
    autoindex off;
    expires off;
  }
}
```

Add NginX server config