import React from 'react'
import { Link } from "react-router-dom";
import { useCategories } from "../shared/contexts/categories.context";

function CategoriesList() {

  const categories = useCategories();

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
