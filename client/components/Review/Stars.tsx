import * as React from 'react';
import { MdStar } from 'react-icons/md';
import { useTheme } from '@chakra-ui/core';

interface StarClickHandler {
  (count: number): any;
}

interface Props {
  count?: number;
  onClick?: StarClickHandler;
}

export const ReviewStars: React.FC<Props> = ({ count = 0, onClick = () => {} }): JSX.Element => {
  const theme = useTheme();
  
  const stars: JSX.Element[] = [];
  
  for (let i = 1; i <= count; i += 1) {
    stars.push(<MdStar key={i} fill="var(--rating-star)" onClick={() => onClick(i)} />);
  }
  
  for (let i = count + 1; i <= 5; i += 1) {
    stars.push(<MdStar key={i} fill={theme.colors.blackAlpha[600]} onClick={() => onClick(i)} />);
  }
  
  // @ts-expect-error
  return stars;
};