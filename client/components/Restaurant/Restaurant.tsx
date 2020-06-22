import * as React from 'react';
import {
  Flex,
  Heading,
  Text,
  useTheme,
  Stack,
} from '@chakra-ui/core';
import Link from 'next/Link';
import { MdLocationOn, MdPhone } from 'react-icons/md';
import { Image } from '../Image';
import { ReviewStars } from '../Review/Stars';

interface Props {
  imageUrl: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  id: string;
}

export const RestaurantCard: React.FC<Props> = ({
  imageUrl,
  name,
  address,
  phone,
  rating,
  reviewsCount,
  id,
}) => {
  const theme = useTheme();

  const lgRadius = theme.radii.lg;

  return (
    <Link href="/restaurants/[id]" as={`/restaurants/${id}`}>
      <Flex
        border={theme.borders['1px']}
        borderColor={theme.colors.blackAlpha[300]}
        flexDirection="column"
        borderRadius={lgRadius}
        backgroundColor={theme.colors.whiteAlpha[50]}
        shadow="lg"
        marginY={theme.space[2]}
      >
        <Image
          loading="lazy"
          src={imageUrl}
          alt={name}
          objectFit="cover"
          height="180px"
          borderRadius={`${lgRadius} ${lgRadius} 0 0`}
        />
        <Stack spacing={3} padding={theme.space[4]}>
          <Heading as="h2" fontSize="xl">
            {name}
          </Heading>
          <Flex
            alignItems="center"
            fontSize="lg"
            justifyContent="space-between"
          >
            <Flex><ReviewStars count={Math.floor(rating)} /></Flex>
            <Text as={Flex} fontSize="sm">
              {reviewsCount} reviews
            </Text>
          </Flex>
          <Stack spacing={2}>
            <Flex alignItems="center" as="p" fontSize="sm">
              <MdLocationOn fill="var(--button-bg-error)" size="1.2rem" />
              <Text as="span" marginLeft=".5rem">
                {address}
              </Text>
            </Flex>
            <Flex alignItems="center" as="p" fontSize="sm">
              <MdPhone fill="var(--button-bg-success)" size="1.2rem" />
              <Text as="span" marginLeft=".5rem">
                {phone}
              </Text>
            </Flex>
          </Stack>
        </Stack>
      </Flex>
    </Link>
  );
};
