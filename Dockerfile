FROM mcr.microsoft.com/playwright:v1.34.0-jammy as build

ENV DUMP_CHROME_OUT=true
ENV TEST_CHROME_ARGS='--no-sandbox --disable-dev-shm-usage --disable-gpu --disable-gpu-compositing --disable-gpu-rasterization'

WORKDIR /app

COPY .npmrc *.json /app/
RUN npm ci

COPY . ./
RUN npm run build
RUN npm run build:server

ARG PROJECTS_FILE=''
RUN [ -e "$PROJECTS_FILE" ] && cp -f "$PROJECTS_FILE" build/projects.json || true

FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/build build

COPY .npmrc *.json ./
RUN npm ci --production

COPY --from=build /app/server/build ./server/

EXPOSE 8999

CMD node server/server.js
