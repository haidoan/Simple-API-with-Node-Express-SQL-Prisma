Simple API with Nodejs,Express,SQL (Prisma ORM)
What is inside
- Node v16.16.0
- ExpressJS
- MySQL 8.0
- Prisma.io
For simplicity of development I use the [Prisma.io](https://www.prisma.io) ORM 
# Install
- install : `npm i`
- run `docker-compose` to spin up SQL server: `docker-compose up`
- migrate db and seeding 
  - cd to the `model` folder: `cd model` and
    - migrate data:  `npx prisma migrate dev --name init`
    - seed data: `npx prisma db seed`
    - (optional) to view data in UI, run command `npx prisma studio` and view data at `http://localhost:5555`

# Start server
- run `npm run start`
- view api-docs at `http://localhost:3009/api-docs`

# Test
- run `npm run test`

# Dependency
- Please install docker
