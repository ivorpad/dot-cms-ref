import React, { useEffect } from 'react'
import styled from 'styled-components'
import CategoriesFilter from './CategoriesFilter';
import loading from '../loading.svg'
import {
  useCategoriesDispatch,
  useCategories
} from "../shared/contexts/categories.context";

const CategoriesNav = styled.nav`
  display: ${props => props.isLoading ? 'flex' : 'block'};
  justify-content: center;
  align-items: center;
  background: white;
  height: 500px;
  position: fixed;
  width: 13%;

`;

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
    <CategoriesNav
      isLoading={categories.length === 0}
      className="categories-list">
      {categories.length > 0 ? (
        <CategoriesFilter />
      ) : (
        <img src={loading} width="32" className="loading" alt="Loading Gif" />
      )}
    </CategoriesNav>
  );
}

export default CategoriesList;
