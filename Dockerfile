FROM node:8.11-alpine

LABEL Michael Pasko (michael.pasko@macmillan.com) 
COPY ./package.json ./

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python
#RUN apk add --no-cache make gcc g++ python && \
#  npm install --production --silent && \
#  apk del make gcc g++ python
RUN apk add --no-cache make python && \
  npm install --production --silent && \
  apk del make python

EXPOSE 3000

COPY ./app ./app
COPY ./features ./features
COPY ./report ./report
CMD ["npm", "run", "test"]
#CMD ["./node_modules/cucumber/bin/cucumber-js"]
