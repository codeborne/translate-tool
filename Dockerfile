FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci

COPY . ./
RUN npm run build

ARG PROJECTS_FILE=''
RUN rm build/projects.json
RUN [ -e "$PROJECTS_FILE" ] && cp "$PROJECTS_FILE" build/projects.json || true

# TODO: skip local i18n

FROM nginx:alpine
WORKDIR /usr/share/nginx/html/
COPY --from=build /app/build ./
