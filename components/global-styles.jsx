import { css, Global, keyframes } from '@emotion/react';

export const globalStyles = (
  <Global
    styles={css`
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
      }
      pre {
        overflow-x: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    `}
  />
);
