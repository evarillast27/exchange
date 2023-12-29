FROM node:18.10.0 as build

WORKDIR /app

COPY package*.json .

COPY .env .

RUN npm install

COPY . .

RUN npm run build



FROM node:18.10.0

WORKDIR /app

COPY package.json .

COPY .env .

RUN npm install --only=production

COPY --from=build /app/dist ./dist

CMD npm run start:prod