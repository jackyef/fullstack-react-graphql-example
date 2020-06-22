import * as React from 'react';
import Layout from '../../components/Layout';
import { Header } from '../../components/NavBar/Header';
import { NavBar } from '../../components/NavBar';
import { Box, Flex } from '@chakra-ui/core';

interface WrapperProps {
  title?: string;
  header?: boolean;
  bottomNavBar?: boolean;
}

export const PageWrapper: React.FC<WrapperProps> = ({ children, title = '', header = true, bottomNavBar = false }) => (
  <Layout title={title}>
    <Box maxWidth={480} width="100vw" margin="0 auto">
      {header ? <Header /> : null}
      <Flex flexDirection="column" flex="1" padding={['1rem']}>
        {children}
      </Flex>
      {bottomNavBar ? <NavBar /> : null}
    </Box>
  </Layout>
);
