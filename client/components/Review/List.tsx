import * as React from 'react';
import { useQuery } from 'graphql-hooks';
import FullPageLoader from '../Spinner/FullPage';
import { ReviewCard } from './Review';
import { EmptyState } from '../State/Empty';
import { ErrorState } from '../State/Error';

interface Props {
  restaurantId: string;
}

const query = `
query RestaurantReviews ($id: uuid!) {
  reviews(where: {restaurant_id: {_eq: $id}}) {
    message
    rating 
    visittedAt
    user {
      name
    }
  }
}
`

export const ReviewList: React.FC<Props> = ({ restaurantId }) => {  
  const { loading, error, data } = useQuery(query, {
    variables: {
      id: restaurantId,
    }
  })

  if (error) {
    if (error instanceof Error) {
      console.error(`error`, error.toString())
      console.error(`stack`, error.stack)
    }

    return <ErrorState message="An error happened when trying to get reviews list 🙇" />;
  }

  if (loading) {
    return <FullPageLoader message="Loading reviews..." />;
  }

  const reviews = data?.reviews ?? [];
  
  if (reviews.length < 1) {
    return (
      <>
        <EmptyState message="No reviews yet. Be the first one to leave a review!" />
      </>
    );
  }

  return (
    <>
      {reviews.map((r: any) => {
        return <ReviewCard key={r.id} {...r} author={r.user.name} />;
      })}
    </>
  );
};
