FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate

RUN npm run build

ENTRYPOINT [ "sh", "-c" ]

CMD [ "npm run prisma:deploy && npm run start" ]
