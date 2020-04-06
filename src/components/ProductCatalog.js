import React from 'react'
import { Switch, Route, useLocation } from "react-router-dom";
import ProductCatalogList from './ProductCatalogList'
import Product from './Product'
import Modal from './Modal'
import NewProductForm from './NewProductForm'
import { px2vh as px } from "../utils/typography";
import styled from "styled-components";
import { media } from "../utils/media";

const SelectCategoryTitle = styled.div`
  display: flex;
  ${media.md`
    margin-left: ${px(210)};
  `}
  p {
    font-size: ${px(56)};
    ${media.md`
      font-size: ${px(24)};
    `}
    ${media.lg`
      font-size: ${px(18)};
    `}
    font-weight: 300;
  }
`;

function ProductCatalog() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/">
          <SelectCategoryTitle>
            <p>Please select a category</p>
          </SelectCategoryTitle>
        </Route>
        <Route path="/category/:id" children={<ProductCatalogList />} />
        <Route path="/product/:id" children={<Product />} />
      </Switch>

      {background && (
        <>
          <Switch>
            <Route
              path="/product/new"
              children={<Modal component={<NewProductForm />} />}
            />
            <Route
              path="/product/:id"
              children={<Modal component={<Product />} />}
            />
          </Switch>
        </>
      )}
    </>
  );
}

export default ProductCatalog;
