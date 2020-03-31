import { css } from "styled-components";

export const sizes = {
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
