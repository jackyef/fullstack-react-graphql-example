import * as React from 'react';
import Router from 'next/Router';
import { Flex, Text, Box, useTheme } from '@chakra-ui/core';
import { MdHome, MdAccountCircle, MdRestaurant } from 'react-icons/md';
import { AuthContext } from '../../context/auth';
import { canUseDOM } from '../../utils/constants';

export const NavBar: React.FC = () => {
  const theme = useTheme();
  const { user } = React.useContext(AuthContext);
  const currentPath = canUseDOM ? Router.pathname : '';

  return (
    <>
      <Box height="64px" />
      <Flex
        position="fixed"
        width="100%"
        maxWidth="480px"
        flex={1}
        bottom={0}
        alignItems="center"
        justifyContent="center"
        boxShadow="var(--shadow-over)"
        backgroundColor="var(--bg-elevated)"
        paddingY="0px"
      >
        <Flex
          flex={1}
          paddingY={theme.space[1]}
          flexDirection="column"
          alignItems="center"
          onClick={() => Router.push('/')}
          backgroundColor={
            currentPath === '/' ? theme.colors.blackAlpha[50] : 'inherit'
          }
        >
          <MdHome size={24} />
          <Text fontSize="xs">Home</Text>
        </Flex>
        {user.role === 'owner' ? (
          <Flex
            flex={1}
            
          paddingY={theme.space[1]}
            flexDirection="column"
            alignItems="center"
            onClick={() => Router.push('/other-restaurants')}
            backgroundColor={currentPath === '/other-restaurants' ? theme.colors.blackAlpha[50] : 'inherit'}
          >
            <MdRestaurant size={24} />
            <Text fontSize="xs">Restaurants</Text>
          </Flex>
        ) : null}
        <Flex
        
        paddingY={theme.space[1]}
          flex={1}
          flexDirection="column"
          alignItems="center"
          onClick={() => Router.push('/account')}
          backgroundColor={currentPath === '/account' ? theme.colors.blackAlpha[50] : 'inherit'}
        >
          <MdAccountCircle size={24} />
          <Text fontSize="xs">Account</Text>
        </Flex>
      </Flex>
    </>
  );
};
