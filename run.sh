mkdir /usr/local/nginx/log -p

docker run --name qiezizhibo-basketball-manage -d -p 8082:8082 -v /usr/local/nginx/log:/var/log/nginx qiezitv/qiezizhibo-basketball-manage:20221215
