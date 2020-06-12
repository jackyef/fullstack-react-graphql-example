import React from 'react';
import { Spinner, Flex } from '@chakra-ui/core';
import Layout from '../components/Layout';
import { PrivateRoute } from '../components/Route/Private';

const Loading = () => <div>Authenticating...</div>;

const Index: React.FC = () => {
  return (
    <Layout title="Home">
      <Flex flexDirection="column">
        <PrivateRoute Fallback={Loading}>
          <div>Hello world!</div>
          <div>Later on we will show restaurant list here based on logged in user</div>
        </PrivateRoute>
        <Spinner />
      </Flex>
    </Layout>
  );
};

export default Index;