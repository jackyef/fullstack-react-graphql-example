import * as React from 'react';
import { Heading, Divider, Text, Stack, Tag } from '@chakra-ui/core';
import { MdStar } from 'react-icons/md';
import { RestaurantList } from '../../components/Restaurant/List';
import { AuthContext } from '../../context/auth';

export const UserHome: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const [rating, setRating] = React.useState(0); // 0 means all

  return (
    <>
      <Stack spacing={2}>
        <Heading as="h1" fontSize="2xl">
          Hi, {user.name.split(' ')[0]} 👋
        </Heading>
        <Text as="p" display="block" fontSize="sm">
          People are saying nice things about these places! Why don&apos;t you
          check them out?
        </Text>
        <Divider />
        <Stack isInline overflowX="scroll" whiteSpace="nowrap">
          <Tag
            onClick={() => setRating(0)}
            variant={rating === 0 ? 'solid' : 'subtle'}
          >
            All
          </Tag>
          <Tag
            onClick={() => setRating(1)}
            variant={rating === 1 ? 'solid' : 'subtle'}
          >
            1 <MdStar fill="var(--rating-star)" />
          </Tag>
          <Tag
            onClick={() => setRating(2)}
            variant={rating === 2 ? 'solid' : 'subtle'}
          >
            2 <MdStar fill="var(--rating-star)" />
          </Tag>
          <Tag
            onClick={() => setRating(3)}
            variant={rating === 3 ? 'solid' : 'subtle'}
          >
            3 <MdStar fill="var(--rating-star)" />
          </Tag>
          <Tag
            onClick={() => setRating(4)}
            variant={rating === 4 ? 'solid' : 'subtle'}
          >
            4 <MdStar fill="var(--rating-star)" />
          </Tag>
          <Tag
            onClick={() => setRating(5)}
            variant={rating === 5 ? 'solid' : 'subtle'}
          >
            5 <MdStar fill="var(--rating-star)" />
          </Tag>
        </Stack>
      </Stack>
      <RestaurantList rating={rating} />
    </>
  );
};
