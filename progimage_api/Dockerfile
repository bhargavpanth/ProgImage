# syntax=docker/dockerfile:1

FROM node:19-alpine3.15

WORKDIR /app

COPY . $SRC_DIR

COPY * ./

# Ideally, credentails should be encrypted when exposing on cluster
ENV AWS_ACCESS_KEY_ID = 'test'\ 
    AWS_SECRET_ACCESS_KEY = 'test' \
    AWS_DEFAULT_REGION = 'us-east-1' \
    AWS_DEFAULT_BUCKET = 'prog-image' \
    IP = 0.0.0.0 \
    PORT = 8080 \
    DB_IP = 0.0.0.0 \
    DB_PORT = 8000

RUN yarn global add ts-node nodemon
RUN yarn install

COPY . .

EXPOSE 8080

CMD ["node", "./dist/index.js"]
