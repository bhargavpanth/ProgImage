# syntax=docker/dockerfile:1

FROM golang:1.16-alpine

WORKDIR /app

COPY . $SRC_DIR
COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

# Ideally, credentails should be encrypted when exposing on cluster
ENV AWS_ACCESS_KEY_ID = 'test'\ 
    AWS_SECRET_ACCESS_KEY = 'test' \
    AWS_DEFAULT_REGION = 'us-east-1' \
    IP = 0.0.0.0 \
    PORT = 4000

ARG VIPS_VERSION="8.13.2"

RUN apk --no-cache add make git gcc libtool musl-dev ca-certificates dumb-init
RUN wget https://github.com/libvips/libvips/releases/download/v${VIPS_VERSION}/vips-${VIPS_VERSION}.tar.gz
RUN apk update && apk add automake build-base pkgconfig glib-dev gobject-introspection libxml2-dev expat-dev jpeg-dev libwebp-dev libpng-dev
# Exit 0 added because warnings tend to exit the build at a non-zero status
RUN tar -xf vips-${VIPS_VERSION}.tar.gz && cd vips-${VIPS_VERSION} && ./configure && make && make install && ldconfig; exit 0
RUN apk del automake build-base

# RUN apt-get update -qq && apt-get install -y libvips42 && go build -o /image_processing
RUN go build -o /image_processing

EXPOSE 4000

CMD [ "/image_processing" ]
