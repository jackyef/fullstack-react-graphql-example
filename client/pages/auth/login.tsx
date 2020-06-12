import * as React from 'react';
import { Flex, useTheme } from '@chakra-ui/core';
import Layout from '../../components/Layout';

const LoginPage = () => {
  const theme = useTheme();

  return (
    <Layout title="Login to APP_NAME">
      <Flex alignSelf="center" padding={theme.space[4]}>
        <a href="http://localhost:44001/api/auth/google">LOGIN NAO!</a>
      </Flex>
    </Layout>
  )
}

export default LoginPage;
