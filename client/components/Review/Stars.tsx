import * as React from 'react';
import { MdStar } from 'react-icons/md';
import { useTheme } from '@chakra-ui/core';

interface Props {
  count?: number;
}

const starCache: Record<number, JSX.Element[]> = {};

export const ReviewStars: React.FC<Props> = ({ count = 0 }): JSX.Element => {
  const theme = useTheme();

  // @ts-expect-error
  if (starCache[count]) return starCache[count];
  
  const stars: JSX.Element[] = [];
  
  for (let i = 1; i <= count; i += 1) {
    stars.push(<MdStar key={i} fill="var(--rating-star)" />);
  }
  
  for (let i = count + 1; i <= 5; i += 1) {
    stars.push(<MdStar key={i} fill={theme.colors.blackAlpha[600]} />);
  }
  
  starCache[count] = stars;
  
  // @ts-expect-error
  return stars;
};