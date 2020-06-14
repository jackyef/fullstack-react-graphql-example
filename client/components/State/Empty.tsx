import * as React from 'react';
import { Stack, Heading, Text } from '@chakra-ui/core';
import { Image } from '../Image';

import EmptyStateImage from '../../assets/undraw_empty_xct9.svg';

interface Props {
  message?: string;
}

export const EmptyState: React.FC<Props> = ({
  message = `There is nothing here, yet.`,
}) => {
  return (
    <Stack spacing={8} alignItems="center" padding="2rem 0" textAlign="center">
      <Image
        loading="lazy"
        src={EmptyStateImage}
        height="160px"
      />
      <Text as="h3" fontSize="sm">
        {message}
      </Text>
    </Stack>
  );
};
