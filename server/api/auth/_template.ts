/* eslint-disable */
import { Application } from 'express';
import mongoose from 'mongoose';

const log = require('debug')('server/api/restaurant/index');

const Restaurant = mongoose.model('Restaurant');

export const setupRestaurantAPIs = (app: Application) => {
  app.get('/api/restaurants', (req, res, next) => {
    // get list of all restaurants
    // can accept sort and filter via query param
  });

  app.post('/api/restaurants', (req, res, next) => {
    // insert new restaurant to database
    // NOT idempotent
  });
  
  app.patch('/api/restaurants/:id', (req, res, next) => {
    // update an existing restaurant in the db
  });

  app.delete('/api/restaurants/:id', (req, res, next) => {
    // delete an existing restaurant in the db
  });


  app.get('asd')
}