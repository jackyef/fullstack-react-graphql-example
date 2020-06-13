import { css } from '@emotion/core';

export default css`
  html,
  body {
    font-family: Arial, sans-serif;
    font-size: 16px;
  }

  body.light-mode {
    --button-bg-secondary: #EDF2F7;
    --button-bg-primary: #493caa;
    --button-bg-accent: #726712;
    --button-bg-error: #cb2259;
    --button-bg-success: #14725a;
  }
  body.dark-mode {
    --button-bg-secondary: #313640;
    --button-bg-primary: #bfb8fc;
    --button-bg-accent: #eddc64;
    --button-bg-error: #ea62a2;
    --button-bg-success: #3ee69b;
  }
`;
