import * as React from 'react';
import querystring from 'querystring';
import { FetchState } from '../../../utils/fetch';

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  ownerId: string;
  // we are not going to upload image to mongo, will think of another way
  // considering using github as free cdn? https://raw.githubusercontent.com/jackyef/test-db/master/test.jpeg
  imageUrl: string;

  // average rating of the restauran
  // Will be updated as it gets new reviews
  // Will be updated when a review is deleted as well
  rating: number;

  // number of reviews the restaurant has received
  // storing this allow us to calculate average faster
  // will be updated when a review is added or deleted
  reviewsCount: number;

  // keep track of the lowest and highest review the restaurant has gotten.
  // lowestReview?: Review;
  // highestReview?: Review;
}

interface State {
  restaurants: Restaurant[];
  state: FetchState;
  error?: Error;
}

const initialState: State = {
  restaurants: [],
  state: 'idle',
};

const restaurantListEndpoint = '/api/restaurants';

export const useRestaurant = ({ ownerId = '' }) => {
  const [state, setState] = React.useState(initialState);

  const { state: fetchState, restaurants, error } = state;

  React.useEffect(() => {
    setState(prev => ({
      ...prev,
      state: 'in-flight',
    }));

    const paramObj: any = {};

    if (ownerId) paramObj.ownerId = ownerId;
    const params = querystring.stringify(paramObj);

    fetch(`${restaurantListEndpoint}?${params}`).then(res => {
      // only 5xx are errors,
      // for non 2xx, we need to check res.ok manually
      if (res.ok) {
        return res.json();
      }

      throw new Error(`${res.status} - ${res.statusText}`);
    }).then(json => {
      setState({
        restaurants: json,
        state: 'done',
      });
    }).catch(error => {
      setState({
        state: 'error',
        restaurants: [],
        error,
      })
    })
  }, [])

  return {
    state: fetchState,
    restaurants,
    error,
  };
}