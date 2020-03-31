import React, { useContext } from 'react'
import styled from 'styled-components'
import CategoriesList from './CategoriesList';
import { CategoriesContext } from './Primary'

const CategoriesNav = styled.nav`
  background: grey;
  width: 30%;
`

function CategoryFilter() {
  const categories = useContext(CategoriesContext);
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
