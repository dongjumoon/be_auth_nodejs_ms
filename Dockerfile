# Common build stage
FROM node:14

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 8888

# Production build stage
#FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
