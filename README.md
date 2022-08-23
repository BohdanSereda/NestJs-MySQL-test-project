## Description

NestJs todo app with MySql as database (TypeOrm)

requests:

- GET: http://localhost:3000/todo?completed=${boolean} - gets all user's todos
- GET: http://localhost:3000/todo/:id - gets one user's todo by id
- POST: http://localhost:3000/todo - creates new todo
- PUT: http://localhost:3000/todo/:id - updates one user's todo by id
- PATCH: http://localhost:3000/todo/:id?completed=${boolean} - changes status of the todo 
- DELETE: http://localhost:3000/todo:/id - removes one user todo by id

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

