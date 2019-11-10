FROM node:12.13-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build

CMD [ "node", "build/server.js" ]

# FROM keymetrics/pm2:12-alpine

# WORKDIR /app

# COPY --from=build /app/build/ /app/
# CMD [ "pm2-runtime", "start", "/app/server.js" ]
