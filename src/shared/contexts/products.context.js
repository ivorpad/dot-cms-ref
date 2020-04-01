import React, { createContext, useState, useContext } from "react";

const ProductsContext = createContext();
const ProductsDispatchContext = createContext();

function ProductsProvider({ children }) {
  const [state, dispatch] = useState([]);
  return (
    <ProductsContext.Provider value={state}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}

function useProductsDispatch() {
  const context = useContext(ProductsDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useProductsDispatch must be used within a ProductsProvider"
    );
  }
  return context;
}

export { ProductsProvider, useProducts, useProductsDispatch };