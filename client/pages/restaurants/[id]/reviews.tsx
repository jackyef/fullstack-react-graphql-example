import * as React from 'react';
import { PageWrapper } from '../../../components/Wrapper/Page';
import { useRouter } from 'next/Router';
import { useManualQuery } from 'graphql-hooks';
import { ErrorState } from '../../../components/State/Error';
import FullPageLoader from '../../../components/Spinner/FullPage';
import { EmptyState } from '../../../components/State/Empty';
import { Heading, Stack } from '@chakra-ui/core';
import { ReviewList } from '../../../components/Review/List';
import { AddReviewButton } from '../../../components/Review/AddReviewButton';

const query = `
query RestaurantName ($id: uuid!) {
  restaurants_by_pk(id: $id) {
    name
  }
}`;

const RestaurantReview: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const fetched = React.useRef(false);
  const [triggerFetch, { data, error, loading }] = useManualQuery(query, {
    variables: {
      id,
    },
  });

  React.useEffect(() => {
    if (id) {
      fetched.current = true;
      triggerFetch();
    }
  }, [id, triggerFetch]);

  
  if (error) {
    return (
      <PageWrapper title="Something bad happened!">
        <ErrorState />
      </PageWrapper>
    );
  }

  const restaurant = data?.restaurants_by_pk;

  if ((loading && !restaurant) || !fetched.current) {
    return (
      <PageWrapper title="Loading...">
        <FullPageLoader message="Fetching reviews..." />
      </PageWrapper>
    );
  }

  if (!restaurant) {
    return (
      <PageWrapper title="This restaurant doesn't exist!">
        <EmptyState message="This restaurant doesn't seem to exist. You might followed a broken link" />
      </PageWrapper>
    );
  }


  return (
    <PageWrapper title={`Reviews for ${restaurant.name}`}>
      <Stack spacing={3}>
        <Heading>Reviews for {restaurant.name}</Heading>
        <ReviewList restaurantId={id as string} />
      </Stack>
      <AddReviewButton restaurantId={id as string} /> 
    </PageWrapper>
  )
}

export default RestaurantReview;
