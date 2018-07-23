FROM node:10.7.0

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build
RUN mv ./build /public
