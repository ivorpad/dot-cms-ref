import React from 'react'
import CategoryFilter from "./CategoryFilter";
import ProductCatalog from "./ProductCatalog";
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CategoriesProvider } from "../shared/contexts/categories.context";

const PrimaryContainer = styled.div`
  display: flex;
`;

function Primary() {
  return (
    <Router>
      <PrimaryContainer>
        <CategoriesProvider>
          <CategoryFilter />
          <Switch>
            <Route exact path="/">
              <p>Please select a category</p>
            </Route>
            <Route path="/category/:id" children={<ProductCatalog />} />
          </Switch>
        </CategoriesProvider>
      </PrimaryContainer>
    </Router>
  );
}

export default Primary
