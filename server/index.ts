require('dotenv').config()

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

import mongoConnection from './mongo/connection';

const PORT = 80;

const app = new Koa();

app.use(logger());
app.use(bodyParser());

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

(async () => {
  await mongoConnection();
  
  app.listen(PORT, () => {
    console.log(`Koa Server is listening on port ${PORT}`);
  });
})();
