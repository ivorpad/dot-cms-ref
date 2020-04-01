import React, { useEffect } from 'react'
import styled from 'styled-components'
import CategoriesList from './CategoriesList';
import {
  useCategoriesDispatch,
  useCategories
} from "../shared/contexts/categories.context";

const CategoriesNav = styled.nav`
  background: grey;
  width: 30%;
`

function CategoryFilter() {
  
  const categories = useCategories();
  const setCategories = useCategoriesDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://${process.env.REACT_APP_DOTCMS_API_URL}/content/render/false/query/-contentType:forms%20+contentType:ProductLineLandingPage%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true/orderby/modDate%20desc/limit/10`
      ).then(r => r.json());
      setCategories(data.contentlets);
    };

    fetchData();
  }, [setCategories]);

  return (
    <CategoriesNav>
      {categories.length > 0 ? (
        <CategoriesList />
      ) : (
        <p>loading...</p>
      )}
    </CategoriesNav>
  );
}

export default CategoryFilter;
