FROM httpd:2.4-alpine as build
COPY src /usr/local/apache2/htdocs/

# If you want to use non-UTC timezone
RUN apk add tzdata
ENV TZ=Europe/Tallinn

# This line is not needed if parent image already exposes a port, but add this to custom images
EXPOSE 80