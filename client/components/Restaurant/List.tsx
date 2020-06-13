import * as React from 'react';
import { useRestaurant } from './hooks/useRestaurants';
import FullPageLoader from '../Spinner/FullPage';
import { RestaurantCard } from './Restaurant';

export const RestaurantList: React.FC = () => {
  const { state, restaurants, error } = useRestaurant();

  if (state === 'error') {
    return <div>an error happened {error}</div>
  }

  if (state !== 'done') {
    return <FullPageLoader message="loading restaurants..." />;
  }

  return (
    <>
      {restaurants.map(r => {
        return <RestaurantCard key={r._id} {...r} />
      })}
    </>
  );
}