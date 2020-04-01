import React, { createContext, useState, useContext } from "react";

const CategoriesContext = createContext();
const CategoriesDispatchContext = createContext();

function CategoriesProvider({ children }) {
  const [state, dispatch] = useState([]);
  return (
    <CategoriesContext.Provider value={state}>
      <CategoriesDispatchContext.Provider value={dispatch}>
        {children}
      </CategoriesDispatchContext.Provider>
    </CategoriesContext.Provider>
  );
}

function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
}

function useCategoriesDispatch() {
  const context = useContext(CategoriesDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useCategoriesDispatch must be used within a CategoriesProvider"
    );
  }
  return context;
}

export { CategoriesProvider, useCategories, useCategoriesDispatch };
