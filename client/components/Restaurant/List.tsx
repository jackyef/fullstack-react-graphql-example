import * as React from 'react';
import { useRestaurant } from './hooks/useRestaurants';
import FullPageLoader from '../Spinner/FullPage';
import { RestaurantCard } from './Restaurant';
import { EmptyState } from '../State/Empty';
import { ErrorState } from '../State/Error';

interface Props {
  ownerId?: string;
  rating?: number;
}

export const RestaurantList: React.FC<Props> = ({ ownerId, rating }) => {
  const { state, restaurants, error } = useRestaurant({ ownerId, rating });

  if (state === 'error') {
    if (error instanceof Error) {
      console.error(`error`, error.toString())
      console.error(`stack`, error.stack)
    }

    return <ErrorState message="An error happened when trying to get restaurants list 🙇" />;
  }

  if (state !== 'done') {
    return <FullPageLoader message="Loading restaurants..." />;
  }

  if (restaurants.length < 1) {
    return (
      <>
        <EmptyState message="Nothing's here yet..." />
      </>
    );
  }

  return (
    <>
      {restaurants.map((r) => {
        return <RestaurantCard key={r._id} {...r} />;
      })}
    </>
  );
};
