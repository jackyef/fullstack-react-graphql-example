import * as React from 'react';
import Router from 'next/Router';
import { Flex, Box, useTheme, useColorMode } from '@chakra-ui/core';
import { MdArrowBack } from 'react-icons/md';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Button } from '../Button';

// this is just to quick testing on development
function ColorModeExample() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex fontSize="2xl">
      <Button onClick={toggleColorMode} variant="ghost">
        {colorMode === 'light' ? <FaSun /> : <FaMoon /> }
      </Button>
    </Flex>
  );
}

export const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <Flex
        height="44px"
        position="fixed"
        paddingTop={theme.space[1]}
        paddingX={theme.space[4]}
        width="100%"
        maxWidth="480px"
        fontSize="2xl"
        flex={1}
        top={0}
        alignItems="center"
        justifyContent="space-between"
        boxShadow="rgba(108, 114, 124, 0.16) 0px 2px 4px 0px"
        backgroundColor="var(--bg-elevated)"
      >
        <MdArrowBack onClick={() => Router.back()} />
        <ColorModeExample />
      </Flex>
      <Box height="44px" />
    </>
  );
};
