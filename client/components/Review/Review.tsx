import * as React from 'react';
import {
  Flex,
} from '@chakra-ui/core';

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
  return (
   <Flex>
     {message}
     {rating}
   </Flex>
  );
};
