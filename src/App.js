import React from 'react';
import Header from './components/Header'
import Primary from './components/Primary'
import styled from 'styled-components';
import { px2vh as px } from "./utils/typography";
import { media, sizes } from './utils/media';
import { Helmet } from "react-helmet";

const Container = styled.div`
  max-width: ${px(sizes.xl)};
  margin: 0 auto;
  ${media.md`max-width: ${px(sizes.lg)};`}
  ${media.lg`max-width: ${px(sizes.lg)};`}
  ${media.xl`max-width: ${px(sizes.md)};`}
`;

function App() {
  return (
    <Container className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Product Catalog</title>
        <link rel="canonical" href="http://dotcms.com/catalog" />
      </Helmet>
      <Header />
      <Primary />
    </Container>
  );
}

export default App;
