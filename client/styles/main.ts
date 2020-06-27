import { css } from '@emotion/core';

export default css`
  html,
  body {
    font-family: Arial, sans-serif;
    font-size: 16px;

    --shadow-under: rgba(108, 114, 124, 0.16) 0px 2px 4px 0px;
    --shadow-over: rgba(108, 114, 124, 0.16) 0px -2px 4px 0px;
  }

  svg {
    transition: fill 0.3s linear;
  }

  body.light-mode {
    --bg: #fff;
    --bg-elevated: #fff;
    --button-bg-secondary: #EDF2F7;
    --button-bg-primary: #493caa;
    --button-bg-accent: #971E8B;
    --button-bg-error: #AB1249;
    --button-bg-success: #14624A;
    
    --rating-star: #FFC200;

    --text-invert: #fff;
    --text-primary: #1a202c;
  }
  body.dark-mode {
    --bg: #1A202C;
    --bg-elevated: #232934;
    --button-bg-secondary: #313640;
    --button-bg-primary: #bfb8fc;
    --button-bg-accent: #eb94e2;
    --button-bg-error: #F18EBC;
    --button-bg-success: #5febac;
    
    --rating-star: #FFC200;
    
    --text-primary: #fff;
    --text-invert: #1a202c;
  }
`;
