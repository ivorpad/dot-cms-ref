import styled, {css} from "styled-components";
import {Link} from 'react-router-dom'

const PrimaryButtonStyle = css`
  border: 1px solid #319795;
  padding: 0.7rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 3px;
  color: #e6fffa;
  text-decoration: none;
  font-size: 14px;
  background: #319795;
  font-weight: 500;
  &:hover {
    border: 1px solid #285e61;
    background: #2c7a7b;
  }
  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;

export const PrimaryButtonLink = styled(
  styled(Link)`
    ${PrimaryButtonStyle}
  `
)``;

export const PrimaryButton = styled.button`
cursor: pointer;
  ${PrimaryButtonStyle}
`;
