FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN yarn
COPY . .

ENV REACT_APP_API_URL=https://urldobackend.com/

RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
