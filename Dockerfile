FROM node:10.14.1
LABEL maintainer="richytong@gmail.com"
LABEL description="Sweet Anime App"
WORKDIR /opt/app
ADD .env .env
ADD dist dist
ADD build build
ADD node_modules node_modules
ADD runserver.js runserver.js
EXPOSE 3000
ENTRYPOINT ["node", "runserver.js", "--mode", "production"]
