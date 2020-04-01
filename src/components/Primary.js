import React from 'react'
import CategoriesList from "./CategoriesList";
import ProductCatalog from "./ProductCatalog";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoriesProvider } from "../shared/contexts/categories.context";
import { ProductsProvider } from "../shared/contexts/products.context";
import styled from 'styled-components'

const PrimaryContainer = styled.div`
  display: flex;
`;

function Primary() {
  return (
    <Router>
      <PrimaryContainer>
        <CategoriesProvider>
          <ProductsProvider>
            <CategoriesList />
            <ProductCatalog />
          </ProductsProvider>
        </CategoriesProvider>
      </PrimaryContainer>
    </Router>
  );
}

export default Primary
