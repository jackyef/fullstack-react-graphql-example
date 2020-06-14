import * as React from 'react';
import {
  Input,
  Stack,
  Flex,
  useTheme,
  Textarea,
  useToast,
} from '@chakra-ui/core';
import Router from 'next/Router';
import { Image } from '../Image';
import ImagePlaceholder from '../../assets/undraw_folder_x4ft.svg';
import { Button } from '../Button';

const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

const uploadEndpoint = '/api/upload/image';
const restaurantEndpoint = '/api/restaurants';

type FormState = 'idle' | 'uploading' | 'submitting' | 'done' | 'error';

export const RestaurantForm: React.FC = () => {
  const [formError, setFormError] = React.useState<Error>();
  const [formState, setFormState] = React.useState<FormState>('idle');
  const [imageDataURI, setImageData] = React.useState<string>();
  const theme = useTheme();
  const toast = useToast();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const descRef = React.useRef<HTMLTextAreaElement>(null);
  const addressRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);
  const imageRef = React.useRef<HTMLInputElement>(null);
  // name, description, address, imageUrl, phone
  // idea, make it an interactive dialog?
  // ain't no time for that, it seems

  const showErrorToast = (message: string) => {
    toast({
      title: `Invalid input`,
      description: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleImageClick = () => {
    if (imageRef.current) {
      // trigger opening file dialog
      imageRef.current.click();
    }
  };

  const handlePreviewImage = (file: File) => {
    const reader = new FileReader();

    reader.onload = async () => {
      setImageData(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleImageChange = () => {
    const inputFileElement = imageRef.current as HTMLInputElement;

    if (!inputFileElement) return;

    const file = inputFileElement.files?.[0];

    if (!file) return;

    const ext = file.name.split('.').pop() || '';

    if (file) {
      if (file.size > 8000000) {
        showErrorToast(`Please choose a smaller image`);
      } else if (allowedImageExtensions.indexOf(ext) < 0) {
        showErrorToast(`Please choose jpg, jpeg, or png image`);
      } else if (!FileReader && !File && !FileList && !Blob) {
        showErrorToast(`Your browser does not support this feature`);
      } else {
        handlePreviewImage(file);
      }
    }
  };

  const handlePostRestaurant = async ({
    name,
    description,
    address,
    phone,
    imageUrl,
  }: {
    name: string,
    description: string,
    address: string,
    phone: string,
    imageUrl: string,
  }) => {
    try {
      const response = await fetch(restaurantEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          name,
          description,
          address,
          phone,
          imageUrl,
        }),
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);

      setFormState('done');
      toast({
        title: 'All done!',
        description: `Your restaurant has been added!`,
        status: 'success',
      });

      // @TODO: redirect to restaurant detail page instead
      Router.push('/')
    } catch (err) {
      toast({
        title: 'Server Error',
        description: err.message,
        status: 'error',
        isClosable: true,
        duration: 5000,
      });

      setFormState('error');
      setFormError(err);
    }
  };

  const handleSubmit = async () => {
    // validate name
    const nameInput = nameRef.current;
    const name = nameInput?.value || '';

    if (name.length < 1) {
      showErrorToast('Restaurant name can not be empty');
      return;
    }
    if (name.length > 50) {
      showErrorToast('Restaurant can not be longer than 50 characters');

      return;
    }

    // description do not need to be validated, it can be empty
    const descInput = descRef.current;
    const description = descInput?.value || '';

    // validate address
    const addressInput = addressRef.current;
    const address = addressInput?.value || '';

    if (address.length < 1) {
      showErrorToast('Address can not be empty');
      return;
    }

    // validate phone
    const phoneInput = phoneRef.current;
    const phone = phoneInput?.value || '';

    if (phone.length < 1) {
      showErrorToast('Phone number can not be empty');
      return;
    }

    // upload image, get imageUrl on github
    try {
      const file = imageRef.current?.files?.[0];
      let imageUrl = '';

      if (file) {
        setFormState('uploading');

        const uploadData = new FormData();
        uploadData.append('file', file);

        const response = await fetch(uploadEndpoint, {
          method: 'POST',
          body: uploadData,
        });

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }

        const json = await response.json();

        imageUrl = json?.imageUrl || '';
      }

      // POST to insert new restaurant
      setFormState('submitting');

      handlePostRestaurant({
        name,
        description,
        phone,
        address,
        imageUrl,
      });
    } catch (err) {
      setFormState('error');
      setFormError(err);

      showErrorToast(err.message);
    }
  };

  return (
    <Stack spacing={2}>
      <Input type="text" name="restaurant-name" ref={nameRef} placeholder="Name of your restaurant" />
      <Textarea
        ref={descRef}
        name="restaurant-description"
        placeholder="Some description about your restaurant. Get people excited about it!"
      />
      <Input
        type="text"
        name="restaurant-address"
        ref={addressRef}
        placeholder="Address to your restaurant"
      />
      <Input
        type="tel"
        name="restaurant-phone"
        ref={phoneRef}
        placeholder="Any number people can call?"
      />
      <Flex
        borderRadius="lg"
        border={theme.borders['1px']}
        borderColor={theme.colors.whiteAlpha[50]}
        backgroundColor={theme.colors.whiteAlpha[100]}
        height={[180, 180, 260]}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        onClick={handleImageClick}
      >
        <Image
          borderRadius="lg"
          height={imageDataURI ? [180, 180, 260] : 120}
          src={imageDataURI || ImagePlaceholder}
          objectFit="cover"
        />
      </Flex>
      <Button variantColor="primary" onClick={handleSubmit} isLoading={formState === 'uploading' || formState === 'submitting'}>
        Add it!
      </Button>
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />
    </Stack>
  );
};
