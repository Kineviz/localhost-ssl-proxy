FROM node:12-alpine

LABEL maintainer="Sean <sean@kineviz.com>"

#app directory
WORKDIR /data

# Install  localhost-ssl-proxy
RUN npm install localhost-ssl-proxy -g

RUN mkdir -p /data
VOLUME /data

EXPOSE 8008

#For Release 
ENV NODE_ENV=production

ENTRYPOINT ["localhost-ssl-proxy"]