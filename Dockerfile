FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci

COPY . ./
RUN npm run build

ARG PROJECTS_FILE=''
RUN [ -e "$PROJECTS_FILE" ] && cp -f "$PROJECTS_FILE" build/projects.json || true

ARG AUTH_FILE=''
RUN [ -e "$AUTH_FILE" ] && cp -f "$AUTH_FILE" build/auth.json || true


FROM nginx:alpine
WORKDIR /usr/share/nginx/html/
COPY --from=build /app/build ./
COPY .k8s/nginx.conf /etc/nginx/nginx.conf
COPY .k8s/.htpasswd /etc/nginx/.htpasswd
