import React from 'react';
import App from 'next/app';
import { ThemeProvider, CSSReset, theme, ColorModeProvider, useColorMode, Button, Flex } from '@chakra-ui/core';
import { Global } from '@emotion/core';

import mainStyles from '../styles/main';
import { AuthProvider } from '../context/auth';

// this is just to quick testing on development
function ColorModeExample() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Flex position="absolute" top="12px" right="12px">
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </Flex>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Global
            styles={mainStyles}
          />
          <ColorModeExample />
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;