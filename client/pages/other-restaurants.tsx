import React from 'react';
import { PrivateRoute } from '../components/Route/Private';
import FullPageLoader from '../components/Spinner/FullPage';
import { UserHome } from '../routes/Home/User';
import { PageWrapper } from '../components/Wrapper/Page';

const Index: React.FC = () => {
  return (
    <PageWrapper title="Other Restaurants" bottomNavBar header={false}>
      <PrivateRoute
        ownerOnly
        fallback={<FullPageLoader message="Authenticating..." />}
      >
        <UserHome />
      </PrivateRoute>
    </PageWrapper>
  );
};

export default Index;
