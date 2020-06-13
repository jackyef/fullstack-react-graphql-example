import * as React from 'react';
import { Button as _Button } from '@chakra-ui/core';

type VariantColor = 'primary' | 'secondary' | 'accent' | 'error' | 'success';
type Variant = 'outline' | 'ghost' | 'solid';

const colors: Record<VariantColor, string> = {
  primary: 'var(--button-bg-primary)',
  secondary: 'var(--button-bg-secondary)',
  accent: 'var(--button-bg-accent)',
  error: 'var(--button-bg-error)',
  success: 'var(--button-bg-success)',
}

const getStyles = (variantColor: VariantColor, variant: Variant) => {
  const output: React.CSSProperties = {};

  if (variant === 'solid') {
    output.backgroundColor = colors[variantColor];
  } else {
    output.backgroundColor = 'transparent';
    
    if (variantColor !== 'secondary') {
      output.color = colors[variantColor];
    }
  }

  if (variant === 'outline') {
    output.border = `1px solid ${colors[variantColor]}`;
  }

  return output;
};
/**
 * Wrapper for chakra-ui button that uses css var for background color
 * This is to work around the fact that buttons in chakra UI sometimes get rendered incorrectly
 * when the initial theme is dark mode
 */
export const Button: typeof _Button = ({ style, variant, variantColor, ...rest }) => {
  const forwardedVariant: any = {};

  if (variantColor !== 'secondary') {
    forwardedVariant.variantColor = variantColor;
  }

  return (
    <_Button {...rest} {...forwardedVariant} style={{
      ...style,
      ...getStyles(variantColor as VariantColor || 'secondary', variant as Variant || 'solid'),
    }} />
  );
}
