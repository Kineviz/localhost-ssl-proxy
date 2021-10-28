FROM node:12-alpine

LABEL maintainer="Sean <sean@kineviz.com>"

#app directory
WORKDIR /data

RUN mkdir -p /data
VOLUME /data

# Install  localhost-ssl-proxy
RUN npm install localhost-ssl-proxy -g

EXPOSE 9443

#For Release 
ENV NODE_ENV=production

ENTRYPOINT ["localhost-ssl-proxy"]