import React from "react";
import { NavLink, useHistory } from "react-router-dom";
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

const SelectCategories = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, .1);
  margin-bottom: 2rem;
  height: 37px;
  font-size: 14px;
  background: ${props => props.theme.main.mediumGray};
  &:focus {
    background: white;
    outline: none;
  }
  color: ${props => props.theme.main.gray};
  @media screen and (min-width: 768px) {
    display: none;
  }
`;


function CategoriesFilter() {
  const categories = useCategories();
  const history = useHistory(

  )
  const handleCategoryOption = (e) => {
    e.target.value === "default"
      ? history.push(`/`)
      : history.push(`/category/${e.target.value}`);
  };

  return (
    <>
      <ul className="categories-menu">
        {categories.map((category, index) => {
          return (
            <li key={index}>
              <LinkItem
                activeClassName="active"
                to={`/category/${category.identifier}`}>
                {category.title}
              </LinkItem>
            </li>
          );
        })}
      </ul>

      {categories && (
        <SelectCategories
          name="categories-mobile"
          className="categories-mobile"
          onChange={handleCategoryOption}>
          <option value="default">Select a category</option>
          {categories.map((category, index) => (
            <option value={category.identifier}>{category.title}</option>
          ))}
        </SelectCategories>
      )}
    </>
  );
};

export default CategoriesFilter
