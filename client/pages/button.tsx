import * as React from 'react';
import { Button as Button2, Divider } from '@chakra-ui/core';
import { Button } from '../components/Button';
import { Box } from '@chakra-ui/core';

const ButtonPage = () => {
  return (
    <>
    <Box padding={"1rem"}>
      <Button variant="solid" variantColor="primary">test</Button>{' '}
      <Button variant="outline" variantColor="primary">test</Button>{' '}
      <Button variant="ghost" variantColor="primary">test</Button>
    </Box>
    <Box padding={"1rem"}>
      <Button variant="solid" variantColor="secondary">test</Button>{' '}
      <Button variant="outline" variantColor="secondary">test</Button>{' '}
      <Button variant="ghost" variantColor="secondary">test</Button>
    </Box>
    <Box padding={"1rem"}>
      <Button variant="solid" variantColor="accent">test</Button>{' '}
      <Button variant="outline" variantColor="accent">test</Button>{' '}
      <Button variant="ghost" variantColor="accent">test</Button>
    </Box>
    <Box padding={"1rem"}>
      <Button variant="solid" variantColor="error">test</Button>{' '}
      <Button variant="outline" variantColor="error">test</Button>{' '}
      <Button variant="ghost" variantColor="error">test</Button>
    </Box>
    <Box padding={"1rem"}>
      <Button variant="solid" variantColor="success">test</Button>{' '}
      <Button variant="outline" variantColor="success">test</Button>{' '}
      <Button variant="ghost" variantColor="success">test</Button>
    </Box>
    <Divider />
    <Box padding={"1rem"}>
      <Button2 variant="solid">test</Button2>{' '}
      <Button2 variant="outline">test</Button2>{' '}
      <Button2 variant="ghost">test</Button2>
    </Box>
    <Box padding={"1rem"}>
      <Button2 variantColor="purple" variant="solid">test</Button2>{' '}
      <Button2 variantColor="purple" variant="outline">test</Button2>{' '}
      <Button2 variantColor="purple" variant="ghost">test</Button2>
    </Box>
    <Box padding={"1rem"}>
      <Button2 variantColor="red" variant="solid">test</Button2>{' '}
      <Button2 variantColor="red" variant="outline">test</Button2>{' '}
      <Button2 variantColor="red" variant="ghost">test</Button2>
    </Box>
    <Box padding={"1rem"}>
      <Button2 variantColor="blue" variant="solid">test</Button2>{' '}
      <Button2 variantColor="blue" variant="outline">test</Button2>{' '}
      <Button2 variantColor="blue" variant="ghost">test</Button2>
    </Box>
    </>
  )
}

export default ButtonPage;
