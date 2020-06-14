import { Application } from 'express';
import mongoose from 'mongoose';
import { ownerOnly, adminOnly } from '../../utils/acl';
import { ValidationError } from '../../utils/errors/ValidationError';

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
  app.get('/api/restaurants', async (req, res) => {
    // get list of all restaurants
    // can accept sort and filter via query param
    const { ownerId, rating } = req.query;

    try {
      // only take what are allowed
      const filteredParam: any = {};

      // only allow owners to query for their own restaurants
      // prevent people that might want to harvest data
      if (ownerId) {
        if (ownerId === req.session?.passport?.user?.id) {
          filteredParam.ownerId = ownerId;
        } else {
          throw new ValidationError({
            code: 403,
            friendlyMessage: `You do not have permission to access this resource.`,
          }, `Non-owner trying to query restaurants list that are not his/hers`);
        }
      }

      if (rating) {
        const floor = Math.floor(Number(rating));
        filteredParam.rating = { $gte: floor, $lt: floor + 1 };
      }

      const restaurants = await Restaurant.find(filteredParam, {
        _id: 1,
        name: 1,
        address: 1,
        imageUrl: 1,
        phone: 1,
        rating: 1,
        reviewsCount: 1,
      }).sort({ rating: -1 });

      res.status(200);
      res.send(restaurants);
    } catch (err) {
      if (err.code) {
        res.status(err.code);
        res.send({
          message: err.friendlyMessage,
        });
      } else {
        // @TODO: handle mongoose error here.
        res.sendStatus(500);
      }
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

  app.patch('/api/restaurants/:id', adminOnly, async (req, res) => {
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
          reviewsCount: 1,
        }
      }).exec();

      res.status(200);
      res.send(restaurant);
    } catch (err) {
      // @TODO: handle mongoose error here.
      res.sendStatus(500)
    }
  });

  app.delete('/api/restaurants/:id', adminOnly, async (req, res) => {
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