import * as React from 'react';
import { Stack, Text } from '@chakra-ui/core';
import { Image } from '../Image';

import ErrorStateImage from '../../assets/undraw_bug_fixing_oc7a.svg';

interface Props {
  message?: string;
}

export const ErrorState: React.FC<Props> = ({
  message = `Whoops, something bad happened. We are looking into this.`,
}) => {
  return (
    <Stack spacing={8} alignItems="center" padding="2rem 0" textAlign="center">
      <Image
        loading="lazy"
        src={ErrorStateImage}
        height="160px"
      />
      <Text as="h3" fontSize="sm">
        {message}
      </Text>
    </Stack>
  );
};
