import * as React from 'react';
import { useQuery } from 'graphql-hooks';
import FullPageLoader from '../Spinner/FullPage';
import { RestaurantCard } from './Restaurant';
import { EmptyState } from '../State/Empty';
import { ErrorState } from '../State/Error';

interface Props {
  ownerId?: string;
  rating?: number;
}

const restaurantFields = `
  address
  description
  id
  imageUrl
  name
  rating
  phone
  reviewsCount
`;

const query = {
  ownerRating: `query RestaurantList ($ownerId: String, $rating: Float) {
    restaurants(where: {owner_id: {_eq: $ownerId}, rating: {_eq: $rating}}) {
      ${restaurantFields}
    }
  }`,
  owner: `query RestaurantList ($ownerId: String) {
    restaurants(where: {owner_id: {_eq: $ownerId}}) {
      ${restaurantFields}
    }
  }`,
  rating: `query RestaurantList ($rating: Float) {
    restaurants(where: {rating: {_eq: $rating}}) {
      ${restaurantFields}
    }
  }`,
  normal: `query RestaurantList {
    restaurants {
      ${restaurantFields}
    }
  }`
};


export const RestaurantList: React.FC<Props> = ({ ownerId, rating }) => {
  let usedQuery = query['normal'];
  const ownerUndefined = typeof ownerId === 'undefined';
  const ratingUndefined = typeof rating === 'undefined';

  if (!ownerUndefined && !ratingUndefined) usedQuery = query['ownerRating'];
  else if (!ownerUndefined) usedQuery = query['owner'];
  else if (!ratingUndefined) usedQuery = query['rating'];
  
  const { loading, error, data } = useQuery(usedQuery, {
    variables: {
      ownerId,
      // rating,
    }
  })

  if (error) {
    if (error instanceof Error) {
      console.error(`error`, error.toString())
      console.error(`stack`, error.stack)
    }

    return <ErrorState message="An error happened when trying to get restaurants list 🙇" />;
  }

  if (loading) {
    return <FullPageLoader message="Loading restaurants..." />;
  }

  const restaurants = data?.restaurants ?? [];
  
  if (restaurants.length < 1) {
    return (
      <>
        <EmptyState message="Nothing's here yet..." />
      </>
    );
  }

  return (
    <>
      {restaurants.map((r: any) => {
        return <RestaurantCard key={r.id} {...r} />;
      })}
    </>
  );
};
