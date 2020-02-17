FROM node:alpine

LABEL maintainer="Kamontat Chantrachirathumrong"
LABEL name="onuser"
LABEL version="v1.1.1"

ENV PAYMENTPLUS_HOST=paymentplus.heroapp.dev
ENV PAYMENTPLUS_PATH=/api/online-users/?format=json
ENV PAYMENTPLUS_AUTH_USERNAME=admin
ENV PAYMENTPLUS_AUTH_PASSWORD=P@ssw0rd

ENV DEBUG="onuser:*,-onuser:*:debug"
ENV DEBUG_HIDE_DATE=false
ENV DEBUG_COLORS=false

RUN mkdir -p /etc/onuser

WORKDIR /etc/onuser

COPY ./dist/index.js /etc/onuser/index.js

EXPOSE 1234

CMD ["node", "/etc/onuser/index.js"]
