#stage 1
FROM node:16-alpine as build
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=build /app/dist/quoteCreator /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/
EXPOSE 80
