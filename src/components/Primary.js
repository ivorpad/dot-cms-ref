import React from 'react'
import CategoriesList from "./CategoriesList";
import ProductCatalog from "./ProductCatalog";
import { CategoriesProvider } from "../shared/contexts/categories.context";
import { ProductsProvider } from "../shared/contexts/products.context";
import styled from 'styled-components'

const PrimaryContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;

function Primary() {
  return (
    <PrimaryContainer className="primary-container">
      <CategoriesProvider>
        <ProductsProvider>
          <CategoriesList />
          <ProductCatalog />
        </ProductsProvider>
      </CategoriesProvider>
    </PrimaryContainer>
  );
}

export default Primary
