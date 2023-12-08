import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './style/globalStyle';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { useTheme } from './hooks/useTheme';
import styled from 'styled-components'; // Import styled-components

function App() {

  const AppContainer = styled.div`
  height: 100vh;
  overflow: hidden;
`;

  const themeToApply = useTheme();

  return (
    <ThemeProvider theme={themeToApply}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <AppRoutes theme={themeToApply} />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;