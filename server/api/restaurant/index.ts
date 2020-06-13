import { Application } from 'express';
import mongoose from 'mongoose';
import { ownerOnly, adminOnly } from '../../utils/acl';
import { ValidationError } from '../../utils/errors/ValidationError';

const log = require('debug')('server/api/restaurant/index');

const Restaurant = mongoose.model('Restaurant');

const requiredFields: Record<string, string[]> = {
  'POST': ['name', 'description', 'address', 'phone', 'imageUrl'],
};

const validateInput = (method: string, body: Record<string, any>): boolean => {
  let missingField = '';

  requiredFields[method].some(field => {
    if (Boolean(body[field])) {
      return false;
    } else {
      missingField = field;

      return true;
    }
  })

  if (missingField) {
    throw new ValidationError({
      code: 422,
      friendlyMessage: `Request body has missing field "${missingField}"`,
      missingField,
    }, `Request body has missing field "${missingField}"`);
  }

  return true;
}

export const setupRestaurantAPIs = (app: Application) => {
  app.get('/api/restaurants', async (_req, res) => {
    // get list of all restaurants
    // can accept sort and filter via query param
    try {
      const restaurants = await Restaurant.find({}, {
        _id: 1,
        name: 1,
        address: 1,
        imageUrl: 1,
        phone: 1,
        rating: 1,
      }).sort({ rating: -1 });

      res.status(200);
      res.send(restaurants);
    } catch (err) {
      // @TODO: handle mongoose error here.
      res.sendStatus(500);
    }
  });

  app.post('/api/restaurants', ownerOnly, (req, res) => {
    // insert new restaurant to database
    // NOT idempotent
    try {
      validateInput('POST', req.body);

      const { name, description, address, imageUrl, phone } = req.body;

      const restaurantJson = {
        name,
        description,
        address,
        imageUrl,
        phone,
        rating: 0,
        reviewsCount: 0,
        ownerId: req.session?.passport.user.id,
      };

      const newRestaurant = new Restaurant(restaurantJson);

      newRestaurant.save();

      res.status(201);
      res.send(restaurantJson);
    } catch (err) {
      res.status(err.code);
      res.send({
        message: err.friendlyMessage,
        missingField: err.missingField,
      });
    }

  });

  app.patch('/api/restaurants/:id', ownerOnly, async (req, res, next) => {
    // update an existing restaurant in the db
    const { id } = req.params;

    const { name, description, address, imageUrl, phone } = req.body;

    try {
      const restaurant = await Restaurant.findByIdAndUpdate(id, {
        $set: { name, description, address, imageUrl, phone }
      }, {
        new: true,
        lean: true,
        omitUndefined: true,
        select: {
          _id: 1,
          name: 1,
          address: 1,
          imageUrl: 1,
          phone: 1,
          rating: 1,
        }
      }).exec();

      res.status(200);
      res.send(restaurant);
    } catch (err) {
      // @TODO: handle mongoose error here.
      res.sendStatus(500)
    }
  });

  app.delete('/api/restaurants/:id', ownerOnly, async (req, res) => {
    // delete an existing restaurant in the db
    const { id } = req.params;

    try {
      await Restaurant.findByIdAndDelete(id).exec();

      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(500);
    }
  });


  app.get('asd')
}