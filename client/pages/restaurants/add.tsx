import * as React from 'react';
import { Flex, Stack, Heading, Text, Divider } from '@chakra-ui/core';
import { PrivateRoute } from '../../components/Route/Private';
import FullPageLoader from '../../components/Spinner/FullPage';
import { RestaurantForm } from '../../components/Restaurant/Form';
import { PageWrapper } from '../../components/Wrapper/Page';

const AddRestaurantPage: React.FC = () => {
  return (
    <PageWrapper title="Add a new restaurant">
      <Flex flexDirection="column" flex="1" padding={['1rem']}>
        <PrivateRoute fallback={<FullPageLoader message="Authenticating..." />}>
          <Stack spacing={2}>
            <Heading as="h1" fontSize="xxl">
              We&apos;ll need some information about your restaurant 🗒
            </Heading>
            <Text as="p" display="block" fontSize="sm">
              Help us out by filling this form!
            </Text>
            <Divider />
            <RestaurantForm />
          </Stack>
        </PrivateRoute>
      </Flex>
    </PageWrapper>
  );
};

export default AddRestaurantPage;
