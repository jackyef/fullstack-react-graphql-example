import { css } from '@emotion/core';

export default css`
  html,
  body {
    font-family: Arial, sans-serif;
    font-size: 16px;
  }

  svg {
    transition: fill 0.3s linear;
  }

  body.light-mode {
    --button-bg-secondary: #EDF2F7;
    --button-bg-primary: #493caa;
    --button-bg-accent: #971E8B;
    --button-bg-error: #AB1249;
    --button-bg-success: #14624A;
    
    --rating-star: #FFC200;
  }
  body.dark-mode {
    --button-bg-secondary: #313640;
    --button-bg-primary: #bfb8fc;
    --button-bg-accent: #eb94e2;
    --button-bg-error: #F18EBC;
    --button-bg-success: #5febac;

    --rating-star: #FFC200;
  }
`;
