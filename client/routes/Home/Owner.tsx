import * as React from 'react';
import { Flex, Heading, Divider, Text, Stack } from '@chakra-ui/core';
import Link from 'next/Link';

import { Button } from '../../components/Button';
import { RestaurantList } from '../../components/Restaurant/List';
import { AuthContext } from '../../context/auth';

export const OwnerHome: React.FC = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <>
      <Stack spacing={2}>
        <Heading as="h1" fontSize="2xl">
          Hi, {user.name.split(' ')[0]} 👋
        </Heading>
        <Text as="p" display="block" fontSize="sm">
          Here are your restaurants. See what people are saying!
        </Text>
        <Divider />
        <Flex flexDirection="column">
          <Button variantColor="primary">
            <Link href="/restaurants/add">
              Add a restaurant
            </Link>
          </Button>
        </Flex>
      </Stack>
      <RestaurantList ownerId={user.id} />
    </>
  );
};

