import * as React from 'react';
import Head from 'next/head';
import { Flex } from '@chakra-ui/core';

type LayoutProps = {
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <Flex maxW="960px" minH={'100vh'}>
      <Head>   
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com"></meta>
      </Head>
      {children}
    </Flex >
  );
}

export default Layout;