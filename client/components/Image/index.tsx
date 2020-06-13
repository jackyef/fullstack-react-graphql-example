import * as React from 'react';
import { Image as _Image, ImageProps } from '@chakra-ui/core';

type Props = ImageProps & {
  loading?: 'lazy' | 'eager' | 'auto';
}

/**
 * Wrapper for chakra-ui Image to allow passing `loading: "lazy"` attribute for native lazy loading
 */
export const Image: React.FC<Props> = ({ loading, ...props }) => {
  return (
    // @ts-expect-error
    <_Image {...props} loading={loading} />
  );
}
