FROM cgr.dev/chainguard/node:18-dev AS builder

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .

RUN yarn build

FROM cgr.dev/chainguard/nginx:latest
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx
COPY --from=builder /usr/src/app/dist /var/lib/nginx/html