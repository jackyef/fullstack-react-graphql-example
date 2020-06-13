import React from 'react';
import { Flex, Button, Heading, Divider } from '@chakra-ui/core';
import Layout from '../components/Layout';
import { PrivateRoute } from '../components/Route/Private';
import { AuthContext } from '../context/auth';
import FullPageLoader from '../components/Spinner/FullPage';

const Index: React.FC = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <Layout title="Home">
      <Flex flexDirection="column" flex="1" padding={["1rem"]}>
        <PrivateRoute fallback={<FullPageLoader message="Authenticated..." />}>
          <div>Hello world!</div>
          <div>Later on we will show restaurant list here based on logged in user</div>
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