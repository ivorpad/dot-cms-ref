import React from 'react'
import CategoryFilter from "./CategoryFilter";
import ProductCatalog from "./ProductCatalog";
import Product from './Product';
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CategoriesProvider } from "../shared/contexts/categories.context";
import { ProductsProvider } from "../shared/contexts/products.context";

const PrimaryContainer = styled.div`
  display: flex;
`;

function Primary() {
  return (
    <Router>
      <PrimaryContainer>
        <CategoriesProvider>
          <ProductsProvider>
            <CategoryFilter />
            <Switch>
              <Route exact path="/">
                <p>Please select a category</p>
              </Route>
              <Route path="/category/:id" children={<ProductCatalog />} />
              <Route path="/product/:id" children={<Product />} />
            </Switch>
          </ProductsProvider>
        </CategoriesProvider>
      </PrimaryContainer>
    </Router>
  );
}

export default Primary
