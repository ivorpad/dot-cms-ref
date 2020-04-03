import React, { useEffect } from 'react'
import styled from 'styled-components'
import CategoriesFilter from './CategoriesFilter';
import {
  useCategoriesDispatch,
  useCategories
} from "../shared/contexts/categories.context";

const CategoriesNav = styled.nav`
  background: grey;
  width: 30%;
`

function CategoriesList() {

  const categories = useCategories();
  const setCategories = useCategoriesDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetch(
        `https://${process.env.REACT_APP_DOTCMS_API_URL}/content/render/false/query/-contentType:forms%20+contentType:ProductLineLandingPage%20+(conhost:${process.env.REACT_APP_DOTCMS_CONNHOST}%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true/orderby/modDate%20desc/limit/10`
      ).then(r => r.json());
      setCategories(data.contentlets);
    };

    fetchCategories();
  }, [setCategories]);

  return (
    <CategoriesNav>
      {categories.length > 0 ? <CategoriesFilter /> : <p>loading...</p>}
    </CategoriesNav>
  );
}

export default CategoriesList;
