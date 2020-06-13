require('dotenv').config()

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from './api/auth/passport/google';
import createSessionStore from './api/auth/store';

import initMongo from './mongo/connection';
import { setupAuthAPIs } from './api/auth';

const log = require('debug')('server');
const PORT = 80;
const app = express();

(async () => {
  const mongoConnection = await initMongo();
  const sessionStore = createSessionStore(mongoConnection);

  app.use(morgan('tiny'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    session({
      cookie: {
        httpOnly: true,
      },
      store: sessionStore,
      secret: process.env['EXPRESS_SECRET'] as string,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  setupAuthAPIs(app);

  app.get('*', (_req, res) => {
    res.send('hello from express')
  });

  app.listen(PORT, () => {
    log(`Express Server is listening on port ${PORT}`);
  });
})();

const gracefulShutdownHandler = () => {
  log('Shutting down due to SIGINT/SIGTERM. This is usually sent by ts-node-dev');

  process.exit(0);
}

process.on('SIGINT', gracefulShutdownHandler);
process.on('SIGTERM', gracefulShutdownHandler);

process.on('unhandledRejection', (reason: Error) => {
  console.error('unhandledRejection', reason.message);
  console.error(reason.stack);

  process.exit(2);
});
process.on('uncaughtException', (reason: Error) => {
  console.error('uncaughtException', reason.message);
  console.error(reason.stack);

  process.exit(3);
});
