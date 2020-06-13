import * as React from 'react';
import { Button as _Button } from '@chakra-ui/core';

const styleFix = {
  backgroundColor: 'var(--button-bg-primary)',
};
/**
 * Wrapper for chakra-ui button that uses css var for background color
 * This is to work around invalid button color in chakra-ui buttons
 */
export const Button: typeof _Button = ({ style, ...rest }) => {
  return (
    <_Button {...rest} style={{
      ...style,
      ...styleFix,
    }} />
  );
}
