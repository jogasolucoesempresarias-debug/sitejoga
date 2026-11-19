# ---- build: gera o site estático (Next output: 'export') ----
FROM node:20-slim AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
# Os artigos do blog são lidos da API NO BUILD. Sem isto, o cache do Docker reaproveitaria o
# build anterior quando só o blog mudou (o código é o mesmo) e o artigo novo não entraria.
ARG BUILD_ID=local
RUN echo "build ${BUILD_ID}" && npm run build

# ---- serve: nginx com o estático ----
FROM nginx:alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/health || exit 1
