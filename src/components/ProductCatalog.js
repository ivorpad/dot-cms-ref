import React from 'react'
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import ProductCatalogList from './ProductCatalogList'
import Product from './Product'
import Modal from './Modal'
import NewProductForm from './NewProductForm'
function ProductCatalog() {

  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  const product = location.state  && location.state.product;
  console.log({ location, history });
  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/">
          <p>Please select a category</p>
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
