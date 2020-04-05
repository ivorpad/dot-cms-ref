import React from 'react'
import { NavLink } from "react-router-dom";
import { useCategories } from "../shared/contexts/categories.context";
import styled from "styled-components";

const LinkItem = styled(
  styled(NavLink)`
    color: ${props => props.theme.main.gray};
    text-decoration: none;
    font-size: 14px;
    display: block;
    /* margin: 0.5em 0; */
    padding: 0.8rem 0.5rem;
    border-bottom: 1px solid ${props => props.theme.main.lightGray};

    &:hover,
    &.active {
      background: ${props => props.theme.main.lightGray};
      box-shadow: 3px 0px 0px 0px rgba(0, 0, 0, 0.1) inset;
    }
  `,
  "active"
)``;

function CategoriesFilter() {
  const categories = useCategories();
  return (
    <ul>
      {categories.map((category, index) => {
        return (
          <li key={index}>
            <LinkItem activeClassName="active" to={`/category/${category.identifier}`}>
              {category.title}
            </LinkItem>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoriesFilter
