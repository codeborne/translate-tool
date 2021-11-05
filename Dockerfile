FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci

COPY . ./
RUN npm run build
RUN ls -la build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html/
COPY --from=build /app/build ./
