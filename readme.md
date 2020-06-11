# Restaurant Reviews Web App

## Stack
- TypeScript
- React + ChakraUI
- Koa for REST API and serving static file
- MongoDB
- Jest

## Developing
```sh
docker-compose up mongo # start the mongoDB server
docker-compose up server # start the node js server
```

If there are changes to Dockerfile.dev, a rebuild is necessary.
```sh
docker-compose up --build server
```

## Next steps
- Setup mongo models and DB structure
- Setup CRUD Restful API for the 4 entity in DB
  - users
  - restaurant
  - comments
  - reviews