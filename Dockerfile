FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="Portal do Paciente Crônico"
LABEL org.opencontainers.image.description="Front-end estático (HTML/CSS/JS) servido via Nginx"

RUN rm -rf /usr/share/nginx/html/*

COPY src/ /usr/share/nginx/html/

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
