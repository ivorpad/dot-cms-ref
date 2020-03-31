import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
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
          <ul>
            {categories.map((category, index) => {
              return (
                <li key={index}>
                  <Link to={`/category/${category.identifier}`}>
                    {category.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>loading...</p>
        )}
      </CategoriesNav>
  );
}

export default CategoryFilter;
