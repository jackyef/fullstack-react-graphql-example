import * as React from 'react';
import Router from 'next/Router';
import { Flex, useTheme, Heading, Text, Stack } from '@chakra-ui/core';
import { FaGoogle } from 'react-icons/fa';
import Layout from '../../components/Layout';
import { AuthContext } from '../../context/auth';

import brandImage from '../../assets/undraw_feedback_h2ft.svg';
import { Image } from '../../components/Image';
import { Button } from '../../components/Button';

const loginUrl = `/api/auth/google`;

const LoginPage = () => {
  const theme = useTheme();
  const { isAuthenticated } = React.useContext(AuthContext);

  console.log(theme)

  React.useLayoutEffect(() => {
    if (isAuthenticated) {
      Router.push('/');
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    window.location.href = loginUrl;
  }

  return (
    <Layout title="Login to Restaurant Reviews">
      <Flex
        alignSelf="center"
        margin="0 auto"
        padding={[theme.space[4], theme.space[16]]}
        flexDirection="column"
        flex={1}
        maxW="540px"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          shadow="lg"
          padding={theme.space[4]}
          paddingTop="-100px"
          paddingBottom={theme.space[12]}
          backgroundColor={theme.colors.whiteAlpha[50]}
          borderRadius="lg"
        >
          <Image
            src={brandImage}
            loading="lazy"
            width={['56vw']}
            maxWidth="240px"
            position="relative"
            top="-144px"
            mb="-112px"
            backgroundColor={theme.colors.whiteAlpha[100]}
            shadow="lg"
            border={theme.borders["1px"]}
            borderColor={theme.colors.blackAlpha[200]}
            padding={theme.space[4]}
            borderRadius="lg"
          />
          <Heading as="h1" textAlign="center" fontSize="2xl" mb={theme.space[12]}>
            Restaurant Reviews App
          </Heading>
          <Button
            role="button"
            onClick={handleLogin}
            variant="solid"
            variantColor="primary"
            leftIcon={FaGoogle}
          >
            Login with Google
          </Button>
        </Flex>
      </Flex>
      <Flex flex={2} display={["none", "none", "flex"]} backgroundColor={theme.colors.blackAlpha[200]} paddingX={theme.space[16]} paddingY={theme.space[64]}>
        <Stack spacing={3}>
          <Text as="strong" display="block" fontSize="2xl">Stop asking questions like:</Text>
          <Text as="strong" display="block" fontSize="5xl"><em>Where do you want to eat?</em></Text>
          <Text as="strong" display="block" fontSize="3xl">Look up the reviews, it&apos;s free.</Text>
        </Stack>
      </Flex>
    </Layout>
  )
}

export default LoginPage;
