import * as React from 'react';
import {
  Box,
  Flex,
  Heading,
  useTheme,
  Stack,
  Text,
  Divider,
} from '@chakra-ui/core';
import { useManualQuery } from 'graphql-hooks';
import { useRouter } from 'next/Router';
import { PageWrapper as Wrapper } from '../../components/Wrapper/Page';
import { ErrorState } from '../../components/State/Error';
import FullPageLoader from '../../components/Spinner/FullPage';
import { EmptyState } from '../../components/State/Empty';
import { Image } from '../../components/Image';
import Link from 'next/Link';
import { ReviewStars } from '../../components/Review/Stars';

const query = `
query RestaurantDetail ($id: uuid!) {
  restaurants_by_pk(id: $id) {
    address
    description
    id
    imageUrl
    name
    owner {
      name
    }
    rating
    reviewsCount
  }
}
`;

const RestaurantDetailPage: React.FC = () => {
  const theme = useTheme();
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
      <Wrapper title="Something bad happened!">
        <ErrorState />
      </Wrapper>
    );
  }

  const restaurant = data?.restaurants_by_pk;

  if ((loading && !restaurant) || !fetched.current) {
    return (
      <Wrapper title="Loading...">
        <FullPageLoader message="Fetching details..." />
      </Wrapper>
    );
  }

  if (!restaurant) {
    return (
      <Wrapper title="This restaurant doesn't exist!">
        <EmptyState message="This restaurant doesn't seem to exist. You might followed a broken link" />
      </Wrapper>
    );
  }

  return (
    <Wrapper title={restaurant.name}>
      <Stack spacing={2}>
        <Heading as="h1">{restaurant.name}</Heading>
        <Image
          loading="lazy"
          src={restaurant.imageUrl}
          borderRadius="lg"
          objectFit="cover"
          height="300px"
        />
        <Flex flexDirection="column">
          <Flex fontSize="2xl" alignItems="center">
            <ReviewStars count={Math.floor(restaurant.rating)} />
            <Box width=".5rem" />
            <strong>{restaurant.rating?.toFixed(1) || 0}</strong>
          </Flex>
          <Box>
            <Text as="span" fontSize="sm" textDecoration="underline">
              <Link href="/restaurants/[id]/reviews" as={`/restaurants/${id}/reviews`}>{`${restaurant.reviewsCount} people reviewed this place`}</Link>
            </Text>
          </Box>
        </Flex>
        <Divider />
        <Heading as="h2" fontSize="lg">
          About this place
        </Heading>
        <Text>
          {restaurant.description || 'No description about this place'}
        </Text>
      </Stack>
    </Wrapper>
  );
};

export default RestaurantDetailPage;
