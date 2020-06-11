import Koa from 'koa';

const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(80, () => {
  console.log('Koa Server is listening on port 80');
});
