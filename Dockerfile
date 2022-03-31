
FROM node:16
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist/demo-app /usr/share/nginx/html
