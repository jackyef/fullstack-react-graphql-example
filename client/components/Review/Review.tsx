import * as React from 'react';
import { Flex, useTheme, Stack, Text, Tag, Tooltip } from '@chakra-ui/core';
import { ReviewStars } from './Stars';

interface Props {
  message: string;
  rating: number;
  visittedAt: string;
  author: string;
}

export const ReviewCard: React.FC<Props> = ({
  message,
  rating,
  visittedAt,
  author,
}) => {
  const theme = useTheme();

  return (
    <Flex
      borderRadius="lg"
      backgroundColor={theme.colors.whiteAlpha['50']}
      padding={theme.space[4]}
      flexDirection="column"
      boxShadow="var(--shadow-under)"
      marginBottom={theme.space[4]}
    >
      <Stack spacing={2}>
        <Flex flexDirection="column">
          <Flex fontSize="xl">
            <ReviewStars count={rating} />
          </Flex>
        </Flex>
        <Text fontStyle="italic">&quot;{message}&quot;</Text>
        <Tooltip
          label={`${author} visitted this place at ${visittedAt}`}
          aria-label={`${author} visitted this place at ${visittedAt}`}
        >
          <Text fontSize="xs" textAlign="right">
            &#8211; <strong>{author || ''}</strong>
          </Text>
        </Tooltip>
      </Stack>
    </Flex>
  );
};
