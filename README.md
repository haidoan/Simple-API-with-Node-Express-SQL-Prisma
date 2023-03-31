Simple API with Nodejs,Express,SQL (Prisma ORM)
What is inside
- Node v16.16.0
- ExpressJS
- MySQL 8.0
- Prisma.io
For simplicity of development I use the [Prisma.io](https://www.prisma.io) ORM

# Idea
There are 2 main models here which are `match` and `calendar`

- `GET /fixture`  is to return all `match` within a period of time
- `GET /fixture/calendar` : return all days (`calendar` table) which have at least 1 match plays, this API support 2 options for client to call
  - get with duration 1 year so that web/app just need to call once when web/app init, this way better in term of not query too much but bakc-end need to query data for whole year, (cache will be good in this way.)
  - get with duration 1 month, there is very high chance user dont navigate too many month, so just need to query within a month.
API detail at `http://localhost:3009/api-docs`
# App structure

```
├── controller // controller layer
│   ├── fixture.js
├── service // service layer
│   ├── fixture.js
├── model // db model layer
│   ├── migrations
│   │   ├── migration_v1
│   │   │   ├── migration.sql
│   ├── seed
│   │   ├── index.js
├── route // routing
│   ├── index.js
├── helper
│   ├── middleware.js // authen
│   ├── error_handling.js // handle API error
├── config
│   ├── db.js // init db
│   ├── environment.js // import env
├── test
│   ├── fixture.test.js // unit test for service layer
│   ├── index.test.js // integration test with supertest
├── app.js
├── server.js
├── .env.js
├── node_modules
├── package.json
├── docker-compose.json
├── package-lock.json 
└── .gitignore

```
# Install
- install : `npm i`
- run `docker-compose` to spin up SQL server: `docker-compose up`
- migrate SQL from Prisma schema
  - cd to the `model` folder: `cd model` and run `npx prisma migrate dev --name init`
- Seeding data
  - in the `root project` directory run command : `npx prisma db seed`
- view data in UI(optional) , 
  - in the `model` folder, run command `npx prisma studio` and view data at `http://localhost:5555`
    
# Start server
- run `npm run start`
- view api-docs at `http://localhost:3009/api-docs`

# Test
- run `npm run test`

# Dependency
Make sure you have
- NodeJS
- Docker
