FROM node:10.14.1
LABEL maintainer="richytong@gmail.com"
LABEL description="React Isomorphic Boilerplate"
RUN mkdir -p /opt/app/keys
ADD package.json /opt/app/package.json
ADD dist /opt/app/dist
ADD build /opt/app/build
ADD node_modules /opt/app/node_modules
EXPOSE 3000
WORKDIR /opt/app
ENTRYPOINT ["node", "/opt/app/dist/server.js"]
