FROM nginx:1.25.1-bookworm

RUN mkdir /etc/nginx/ssl

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx_ui.key -out /etc/nginx/ssl/nginx_ui.crt -subj "/CN=react-app"
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx_api.key -out /etc/nginx/ssl/nginx_api.crt -subj "/CN=node-app"

CMD ["nginx", "-g", "daemon off;"]
