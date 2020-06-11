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

