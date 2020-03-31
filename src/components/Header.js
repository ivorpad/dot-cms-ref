import React from 'react'
import styled from "styled-components";
import { px2vh as px } from "../utils/typography";
import { media } from "../utils/media";

const HeaderContainer = styled.header`
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 1px solid red;
  h1 {
    font-size: ${px(48)};
    ${media.md`font-size: ${px(36)};`}
    ${media.lg`font-size: ${px(24)};`}
      font-weight: bold;
  }
`;

function Header() {
  return (
    <HeaderContainer className="page-header">
      <h1>Product Catalog</h1>
    </HeaderContainer>
  )
}

export default Header
