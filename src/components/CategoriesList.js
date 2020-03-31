import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import {CategoriesContext} from './Primary'

function CategoriesList() {

  const categories = useContext(CategoriesContext);

  return (
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
  );
};

export default CategoriesList
