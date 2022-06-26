FROM node:14.17.1

WORKDIR /src

COPY yarn.lock .
COPY package.json .

RUN yarn install --frozen-lockfile

COPY src ./src

CMD yarn devStart