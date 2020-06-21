import React from 'react';
import App from 'next/app';
import {
  ThemeProvider,
  CSSReset,
  theme,
  ColorModeProvider,
  useColorMode,
  Flex,
} from '@chakra-ui/core';
import { Global } from '@emotion/core';
import { GraphQLClient, ClientContext } from 'graphql-hooks';

import mainStyles from '../styles/main';
import { AuthProvider } from '../context/auth';
import { Button } from '../components/Button';

// this is just to quick testing on development
function ColorModeExample() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex position="absolute" top="12px" right="12px">
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </Flex>
  );
}

const client = new GraphQLClient({
  url: '/v1/graphql',
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Global styles={mainStyles} />
          <ColorModeExample />
          <AuthProvider>
            <ClientContext.Provider value={client}>
              <Component {...pageProps} />
            </ClientContext.Provider>
          </AuthProvider>
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
