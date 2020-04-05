import React from 'react'
import styled from "styled-components";
import { px2vh as px } from "../utils/typography";
import { media } from "../utils/media";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.01);

  a {
    text-decoration: none;
    color: black;
    font-size: ${px(48)};
    ${media.md`font-size: ${px(36)};`}
    ${media.lg`font-size: ${px(16)};`}
    font-weight: bold;
    &:hover {
      color: ${props => props.theme.main.gray};
    }
  }
`;

const ProductSearch = styled.div`
  input {
    background: #ECEEF3;
    border: none;
    padding: .5rem .8rem;
    border-radius: 15px;
  }
`;

function Header() {
  return (
    <HeaderContainer className="page-header">
      <h1>
        <Link to="/">
          Product Catalog
        </Link>
      </h1>

      <ProductSearch className="search">
        <input id="search" type="text" placeholder="Search..." />
      </ProductSearch>
    </HeaderContainer>
  );
}

export default Header
