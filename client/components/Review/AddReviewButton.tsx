import * as React from 'react';
import { MdChatBubble } from 'react-icons/md';
import { Button } from '../Button';
import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Flex,
  Textarea,
  Stack,
  Input,
  FormLabel,
  FormControl,
  useToast,
} from '@chakra-ui/core';
import { ReviewStars } from './Stars';
import { useMutation } from 'graphql-hooks';
import Router from 'next/Router';

interface Props {
  restaurantId: string;
}

const mutation = `
mutation AddReview ($message: String, $rating: Int, $visittedAt: date, $restaurantId: uuid){
  insert_reviews_one (object:{message: $message, rating: $rating, visittedAt: $visittedAt, restaurant_id: $restaurantId}) {
    id
    message
    rating
    visittedAt
  }
}
`;

export const AddReviewButton: React.FC<Props> = ({ restaurantId }) => {
  const [addReview] = useMutation(mutation);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = React.useState(0);
  const toast = useToast();
  const messageRef = React.useRef<HTMLTextAreaElement>(null);
  const dateRef = React.useRef<HTMLInputElement>(null);

  const showErrorToast = (message: string) => {
    toast({
      title: `Invalid input`,
      description: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleStarClick = (count: number) => {
    setRating(count);
  };

  const handleSubmit = async () => {
    const message = messageRef.current?.value || '';
    const date = dateRef.current?.value || '';

    console.log({ message, date })

    if (!date) {
      showErrorToast('Visit date can not be empty!');

      return;
    }

    try {
      const res = await addReview({ variables: {
        message,
        visittedAt: new Date(date),
        restaurantId,
        rating,
      }})

      if (res.error) {
        throw new Error('Failed to add new restaurant!');
      }

      toast({
        title: 'All done!',
        description: `Your review has been added!`,
        status: 'success',
      });

      Router.push(`/restaurants/${restaurantId}`);

    } catch (err) {
      toast({
        title: 'Server Error',
        description: err.message,
        status: 'error',
        isClosable: true,
        duration: 5000,
      });
    }
  }

  return (
    <>
      <Button
        variantColor="primary"
        borderRadius="50%"
        position="fixed"
        bottom="64px"
        right="24px"
        size="lg"
        height="48px"
        width="48px"
        padding="0"
        onClick={onOpen}
      >
        <MdChatBubble />
      </Button>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent paddingBottom="2rem">
          <DrawerHeader borderBottomWidth="1px">Add your review</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <Flex fontSize="3rem" justifyContent="center">
                <ReviewStars count={rating} onClick={handleStarClick} />
              </Flex>
              <Textarea
                ref={messageRef}
                name="review-message"
                placeholder="Put some words about the restaurant, let people know about it!"
              />
              <FormControl>
                <FormLabel htmlFor="visitDate">When was your visit?</FormLabel>
                <Input id="visitDate" type="date" ref={dateRef} />
              </FormControl>
              <Button variantColor="primary" onClick={handleSubmit}>Add your review</Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
