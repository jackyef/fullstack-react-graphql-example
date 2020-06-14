import * as React from 'react';
import Link from 'next/Link';
import { useRestaurant } from './hooks/useRestaurants';
import FullPageLoader from '../Spinner/FullPage';
import { RestaurantCard } from './Restaurant';
import { EmptyState } from '../State/Empty';
import { ErrorState } from '../State/Error';
import { Button } from '../Button';
import { Box, Flex } from '@chakra-ui/core';

interface Props {
  ownerId?: string;
}

export const RestaurantList: React.FC<Props> = ({ ownerId }) => {
  const { state, restaurants, error } = useRestaurant({ ownerId });

  if (state === 'error') {
    if (error instanceof Error) {
      console.error(`error`, error.toString())
      console.error(`stack`, error.stack)
    }

    return <ErrorState message="An error happened when trying to get your restaurants 🙇" />;
  }

  if (state !== 'done') {
    return <FullPageLoader message="loading restaurants..." />;
  }

  if (restaurants.length < 1) {
    return (
      <>
        <EmptyState message="You don't have any restaurants yet" />
        <Flex flexDirection="column" alignItems="center">
          <Button variantColor="primary">
            <Link href="/restaurant/add">
              Add a restaurant
            </Link>
          </Button>
        </Flex>
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
