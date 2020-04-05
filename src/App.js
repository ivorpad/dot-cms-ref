import React from 'react';
import Header from './components/Header'
import Primary from './components/Primary'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { px2vh as px } from "./utils/typography";
import { media, sizes } from './utils/media';
import { Helmet } from "react-helmet";
import { BrowserRouter as Router } from "react-router-dom";

const Container = styled.div`
  max-width: ${px(sizes.xl)};
  min-height: 40vh;
  padding-bottom: 3rem;
  margin: 0 auto;
  ${media.md`max-width: ${px(sizes.lg)};`}
  ${media.lg`max-width: ${px(sizes.lg)};`}
  ${media.xl`max-width: ${px(sizes.md)};`}
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: #ECEEF3;
  }
`;

const theme = {
  main: {
    gray: "#737373",
    mediumGray: "#ECEEF3",
    lightGray: "#f6f6f6"
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container className="App">
        <GlobalStyle />
        <Router>
          <Helmet>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Product Catalog</title>
            <link rel="canonical" href="http://dotcms.com/" />
          </Helmet>
          <Header />
          <Primary />
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
