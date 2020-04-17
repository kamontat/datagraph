FROM node:alpine

LABEL maintainer="Kamontat Chantrachirathumrong"
LABEL name="onuser"
LABEL version="v1.2.0"

ENV PAYMENTPLUS_HOST=pttep.users.heroapp.dev
ENV PAYMENTPLUS_PATH=/api/online-users/?format=json

ENV PAYMENTPLUS_AUTH_USERNAME=
ENV PAYMENTPLUS_AUTH_PASSWORD=

ENV PAYMENTPLUS_STAGING_HOST=paymentplus.heroapp.dev
ENV PAYMENTPLUS_STAGING_PATH=/api/online-users/?format=json

ENV PAYMENTPLUS_STAGING_AUTH_USERNAME=
ENV PAYMENTPLUS_STAGING_AUTH_PASSWORD=

# ENV DEBUG="onuser:*"
ENV DEBUG_HIDE_DATE=false
ENV DEBUG_COLORS=false

RUN mkdir -p /etc/onuser
WORKDIR /etc/onuser

COPY ./dist/index.js /etc/onuser/index.js

EXPOSE 1234

CMD ["node", "/etc/onuser/index.js"]
