import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    // font-family: 'VT323', monospace;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.textColor};
  }

`;