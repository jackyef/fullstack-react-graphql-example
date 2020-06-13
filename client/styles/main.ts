import { css } from '@emotion/core';

export default css`
  html,
  body {
    font-family: Arial, sans-serif;
    font-size: 16px;
  }

  body.light-mode {
    --button-bg-primary: #EDF2F7;
  }
  body.dark-mode {
    --button-bg-primary: #313640;
  }
`;
