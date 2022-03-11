FROM node:14
RUN npm i -g npm@7
ENV CHOKIDAR_USEPOLLING=true
WORKDIR /usr/src/app
