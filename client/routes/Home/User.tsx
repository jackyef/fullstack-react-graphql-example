import * as React from 'react';
import { Heading, Divider, Text, Stack } from '@chakra-ui/core';
import { RestaurantList } from '../../components/Restaurant/List';
import { AuthContext } from '../../context/auth';

export const UserHome: React.FC = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <>
      <Stack spacing={2}>
        <Heading as="h1" fontSize="2xl">
          Hi, {user.name.split(' ')[0]} 👋
        </Heading>
        <Text as="p" display="block" fontSize="sm">
          People are saying nice things about these places! Why don&apos;t you
          check them out?
        </Text>
        <Divider />
      </Stack>
      <RestaurantList />
    </>
  );
};

