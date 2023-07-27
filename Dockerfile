### STAGE 1: Build ###
FROM docker.io/node:18.17-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM docker.io/nginx:1.25.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/isthistrue /usr/share/nginx/html
