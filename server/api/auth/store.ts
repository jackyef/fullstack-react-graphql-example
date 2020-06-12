import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

export default (mongooseConnection: mongoose.Connection) => new MongoStore({ mongooseConnection });
