FROM node:14 AS nx

WORKDIR /nx

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN ls
RUN npx nx run-many --target=build --all


FROM node:14 AS hub
WORKDIR /app
COPY --from=nx /nx/dist/apps/hub .
COPY --from=nx /nx/package-lock.json .

RUN npm ci --production
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express hbs

ENV PORT=80
EXPOSE ${PORT}

CMD node ./main.js


FROM node:14 AS clients
WORKDIR /app
COPY --from=nx /nx/dist/apps/clients .
COPY --from=nx /nx/package-lock.json .

RUN npm ci --production
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express hbs

ENV PORT=80
EXPOSE ${PORT}

CMD node ./main.js


FROM node:14 AS dashboard
WORKDIR /app
COPY --from=nx /nx/dist/apps/dashboard .
COPY --from=nx /nx/package-lock.json .

RUN npm ci --production
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express hbs

ENV PORT=80
EXPOSE ${PORT}

CMD node ./main.js
