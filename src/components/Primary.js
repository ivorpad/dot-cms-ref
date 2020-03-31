import React, { createContext, useState, useEffect } from 'react'
import CategoryFilter from "./CategoryFilter";
import ProductCatalog from "./ProductCatalog";
import styled from 'styled-components'
// import { px2vh as px } from "../utils/typography";
// import { media, sizes } from "../utils/media";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const PrimaryContainer = styled.div`
  display: flex;
`;

export const CategoriesContext = createContext(null)

function Primary() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://${process.env.REACT_APP_DOTCMS_API_URL}/content/render/false/query/-contentType:forms%20+contentType:ProductLineLandingPage%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true/orderby/modDate%20desc/limit/10`
      ).then(r => r.json());
      setCategories(data.contentlets);
       console.log(data);
    };

   

    fetchData();
  }, []);

  return (
    <Router>
      <CategoriesContext.Provider value={categories}>
        <PrimaryContainer>
          <CategoryFilter />
          <Switch>
            <Route exact path="/">
              <p>Please select a category</p>
            </Route>
            <Route path="/category/:id" children={<ProductCatalog />} />
          </Switch>
        </PrimaryContainer>
      </CategoriesContext.Provider>
    </Router>
  );
}

export default Primary
