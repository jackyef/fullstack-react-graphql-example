import * as React from 'react';
import Router from 'next/Router';
import { Flex, Text, Box, useTheme } from '@chakra-ui/core';
import { MdHome, MdAccountCircle } from 'react-icons/md';
import { AuthContext } from '../../context/auth';

export const NavBar: React.FC = () => {
  const theme = useTheme();
  const { user } = React.useContext(AuthContext);

  return (
    <>
      <Box height="64px" />
      <Flex
        height="56px"
        position="fixed"
        paddingTop={theme.space[1]}
        width="100%"
        maxWidth="480px"
        flex={1}
        bottom={0}
        alignItems="center"
        justifyContent="center"
        boxShadow="rgba(108, 114, 124, 0.16) 0px -2px 4px 0px"
        backgroundColor="var(--bg-elevated)"
      >
        <Flex flex={1} flexDirection="column" alignItems="center" onClick={() => Router.push('/')}>
          <MdHome size={24} />
          <Text fontSize="xs">Home</Text>
        </Flex>
        {user.role === 'owner' ? (
          <Flex flex={1} flexDirection="column" alignItems="center">
            <MdHome size={24} />
            <Text fontSize="xs">Home</Text>
          </Flex>
        ) : null}
        <Flex flex={1} flexDirection="column" alignItems="center" onClick={() => Router.push('/account')}>
          <MdAccountCircle size={24} />
          <Text fontSize="xs">Account</Text>
        </Flex>
      </Flex>
    </>
  );
};
