const logger = require('debug')('server/mongo/connection');

import mongoose from 'mongoose';
import './models/User';
import './models/Restaurant';

const user = process.env['MONGODB_USERNAME']
const pass = process.env['MONGODB_PASSWORD']
const host = process.env['MONGODB_HOST']
const port = process.env['MONGODB_PORT']
const db = process.env['MONGODB_DATABASE'];

const mongoUrl = `mongodb://${user}:${pass}@${host}:${port}/${db}`;

export default (): Promise<mongoose.Connection> => {
  const connect = (): void => {
    mongoose.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
  };

  return new Promise<mongoose.Connection>((resolve): void => {
    logger('Connecting to mongodb', mongoUrl);
    connect();

    const onError = (err: Error): void => {
      logger('mongo db error', err);
    };

    mongoose.connection.on('error', onError);
    mongoose.connection.on('reconnectFailed', onError);
    mongoose.connection.once('open', (): void => {
      logger('Connected to mongodb');
      resolve(mongoose.connection);
    });
  });
};

