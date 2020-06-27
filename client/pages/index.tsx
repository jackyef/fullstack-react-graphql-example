import React from 'react';
import { Flex, Heading, Divider, Box } from '@chakra-ui/core';
import Layout from '../components/Layout';
import { PrivateRoute } from '../components/Route/Private';
import { AuthContext } from '../context/auth';
import FullPageLoader from '../components/Spinner/FullPage';
import { UserHome } from '../routes/Home/User';
import { OwnerHome } from '../routes/Home/Owner';
import { NavBar } from '../components/NavBar';

const pageMap: Record<string, React.ElementType> = {
  user: UserHome,
  owner: OwnerHome,
  admin: UserHome, // Admin homepage will be the last one to be worked on
};

const Index: React.FC = () => {
  const { user } = React.useContext(AuthContext);

  const Page = pageMap[user.role];

  return (
    <Layout title="Home">
      <PrivateRoute fallback={<FullPageLoader message="Authenticating..." />}>
        <Box maxWidth={480} width="100%" margin="0 auto">
          <Flex flexDirection="column" flex="1" padding={['1rem']}>
            {Page ? <Page /> : null}
            <Divider />
          </Flex>
          <NavBar />
        </Box>
      </PrivateRoute>
    </Layout>
  );
};

export default Index;
