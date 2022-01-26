FROM node:16-alpine as build
RUN apk add --no-cache chromium
ENV TEST_CHROME_ARGS='--no-sandbox'

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci

COPY . ./
RUN npm run build
RUN npm run build:server

ARG PROJECTS_FILE=''
RUN [ -e "$PROJECTS_FILE" ] && cp -f "$PROJECTS_FILE" build/projects.json || true

FROM node:16-alpine

WORKDIR /app
COPY --from=build /app/build build

COPY *.json ./
RUN npm ci --production

COPY server/* ./

EXPOSE 8999

CMD node server.js
