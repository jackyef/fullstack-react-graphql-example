import React from 'react';
import { Flex, Button, Heading, Divider, Text, Stack } from '@chakra-ui/core';
import Layout from '../components/Layout';
import { PrivateRoute } from '../components/Route/Private';
import { AuthContext } from '../context/auth';
import FullPageLoader from '../components/Spinner/FullPage';
import { RestaurantList } from '../components/Restaurant/List';

const Index: React.FC = () => {
  const { logout, user } = React.useContext(AuthContext);

  return (
    <Layout title="Home">
      <Flex flexDirection="column" flex="1" padding={["1rem"]}>
        <PrivateRoute fallback={<FullPageLoader message="Authenticating..." />}>
          <Stack spacing={2}>
            <Heading as="h1" fontSize="2xl">
              Hi, {user.name.split(' ')[0]} 👋
            </Heading>
            <Text as="p" display="block" fontSize="sm">People are saying nice things about these places! Why don&apos;t you check them out?</Text>
            <Divider />
          </Stack>
          <RestaurantList />
          <Divider />
          <Heading as="h3">Log out here</Heading>
          <Button variantColor="red" onClick={logout}>
            Click me to logout!
          </Button>
        </PrivateRoute>
      </Flex>
    </Layout>
  );
};

export default Index;