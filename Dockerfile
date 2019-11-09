FROM node:12.13-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm run build

FROM keymetrics/pm2:12-alpine
WORKDIR /app
COPY --from=build build/ app/
CMD [ "pm2-runtime", "start", "index.js" ]
