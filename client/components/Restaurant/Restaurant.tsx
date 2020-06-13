import * as React from 'react';
import { Restaurant } from './hooks/useRestaurants';
import { Flex, Heading, Text, useTheme, Stack, DefaultTheme } from '@chakra-ui/core';
import { MdLocationOn, MdPhone, MdStar } from 'react-icons/md';
import { Image } from '../Image';

type Props = Omit<Restaurant, '_id'>;

const starCache: Record<number, React.ReactElement[]> = {};

const renderStars = (count: number, theme: DefaultTheme) => {
  if (starCache[count]) return starCache[count];

  const stars: React.ReactElement[] = [];

  for (let i = 1; i <= count; i += 1) {
    stars.push(<MdStar key={i} fill="var(--rating-star)" />)
  }
  
  for (let i = count + 1; i <= 5; i += 1) {
    stars.push(<MdStar key={i} fill={theme.colors.blackAlpha[600]} />)
  }

  starCache[count] = stars;

  return stars;
}

export const RestaurantCard: React.FC<Props> = ({
  imageUrl,
  name,
  address,
  phone,
  rating,
  reviewsCount,
}) => {
  const theme = useTheme();

  const lgRadius = theme.radii.lg;

  return (
    <Flex
      flex="1"
      border={theme.borders["1px"]}
      borderColor={theme.colors.blackAlpha[300]}
      flexDirection="column"
      borderRadius={lgRadius}
      backgroundColor={theme.colors.whiteAlpha[50]}
      shadow="lg"
      marginY={theme.space[2]}
    >
      <Image loading="lazy" src={imageUrl} alt={name} objectFit="cover" height="180px" borderRadius={`${lgRadius} ${lgRadius} 0 0`}/>
      <Stack spacing={3} padding={theme.space[4]}>
        <Heading as="h2" fontSize="xl">
          {name}
        </Heading>
        <Flex alignItems="center" fontSize="lg" justifyContent="space-between">
          <Flex>
            {renderStars(Math.floor(rating), theme)}
          </Flex>
          <Text as={Flex} fontSize="sm">
            {reviewsCount} reviews
          </Text>
        </Flex>
        <Stack spacing={2}>
          <Flex alignItems="center" as="p" fontSize="sm">
            <MdLocationOn fill="var(--button-bg-error)" size="1.2rem" /> 
            <Text as="span" marginLeft=".5rem">{address}</Text>
          </Flex>
          <Flex alignItems="center" as="p" fontSize="sm">
            <MdPhone fill="var(--button-bg-success)" size="1.2rem" />
            <Text as="span" marginLeft=".5rem">{phone}</Text>
          </Flex>
        </Stack>
      </Stack>
    </Flex>
  );
};
