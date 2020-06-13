import * as React from 'react';
import { Flex, Spinner, Text, useTheme } from '@chakra-ui/core';

interface Props {
  message?: string;
}

const FullPageLoader: React.FC<Props> = ({ message = '' }) => {
  const theme = useTheme();

  return (
    <Flex minH="100vh" width="100%" alignItems="center" justifyContent="center" flexDirection="column">
      <Text as="p" marginBottom={theme.space[4]}>{message}</Text>
      <Spinner />
    </Flex>
  )
}

export default FullPageLoader;
