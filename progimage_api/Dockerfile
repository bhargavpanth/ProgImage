# syntax=docker/dockerfile:1

FROM node:19-alpine3.15

WORKDIR /app

COPY . $SRC_DIR

COPY * ./

# Ideally, credentails should be encrypted when exposing on cluster
ENV AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID'\ 
    AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY' \
    AWS_DEFAULT_REGION = 'AWS_DEFAULT_REGION' \
    AWS_DEFAULT_BUCKET = 'AWS_DEFAULT_BUCKET' \
    IP = 0.0.0.0 \
    PORT = 4000

RUN yarn global add ts-node nodemon
RUN yarn install

COPY . .

EXPOSE 8080

CMD ["node", "./dist/index.js"]
