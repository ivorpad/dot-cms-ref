import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { useCategories } from '../shared/contexts/categories.context';
import { useProductsDispatch, useProducts } from "../shared/contexts/products.context";
import { px2vh as px, truncate } from "../utils/typography";
import { media, sizes } from "../utils/media";

const ProductsCatalogListContainer = styled.div`
  width: 72.4%;
  margin-left: auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const CategoryTitle = styled.h1`
  font-weight: 200;
  font-size: ${px(48)};
  ${media.md`font-size: ${px(36)};`}
  ${media.lg`font-size: ${px(22)};`}
  ${media.xl`font-size: ${px(20)};`}
`;

const ProductCatalogHeader = styled.header`
 display: flex;
 justify-content: space-between;
 border-bottom: 1px solid #ddd;
 padding-bottom: 1rem;
`

const AddNewProductButton = styled(
  styled(Link)`
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
      border: 1px solid #285E61;
      background: #2c7a7b;
    }
    &:active {
      transform: translateY(1px);
      box-shadow: none;
    }
  `
)``;

const ProductLinkStyled = styled(
  styled(Link)`
    background: white;
    position: relative;
    border-radius: 3px;
    height: 250px;
    border-radius: 3px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      &:hover .title-overlay {
        visibility: visible;
        opacity: 1;
      } 
    img {
      width: 100%;
      height: 250px;
      object-fit: contain;
    }
  `
)``;

const TitleOverlay = styled.div`
  transition: all 0.1s ease-in-out;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.68531162464986) 0%,
    rgba(255, 255, 255, 0) 42%,
    rgba(255, 255, 255, 0) 100%
  );
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  top: 0;
  height: 100%;
  width: 100%;
  position: flex;
  padding: 1rem;
  h3 {
    color: white;
    font-weight: bold;
    position: absolute;
    bottom: 0;
    line-height: 1.5;
    margin-bottom: 30px;
  }
`;

function ProductCatalog() {
  const categories = useCategories();
  const { id } = useParams();
  const products = useProducts();
  const setProducts = useProductsDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const location = useLocation();
  
  const categoryFiltered = useMemo(
    () => categories.filter(category => category.identifier === id)
  , [categories, id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const products = await fetch(
          `https://${process.env.REACT_APP_DOTCMS_API_URL}/content/render/false/query/-contentType:forms%20+contentType:Product%20+(conhost:${process.env.REACT_APP_DOTCMS_CONNHOST}%20conhost:SYSTEM_HOST)%20+Product.productLine:${id}%20+languageId:1%20+deleted:false%20+working:true/orderby/score,modDate%20desc/depth/2`
        ).then(results => results.json());

        setProducts(products.contentlets);
        setIsLoading(false);
      } catch (error) {
        // Set error message
        setIsLoading(false);
      }
    };
    fetchProducts();
    categoryFiltered.map(category => setCategory({ title: category.title, identifier: category.identifier}));
  }, [id, categoryFiltered, setProducts]);

  const ProductLink = ({to, children}) => {
    return (
      <ProductLinkStyled to={to}>{children}</ProductLinkStyled>
    )
  }

  return (
    <ProductsCatalogListContainer className="products-catalog-list">
      <ProductCatalogHeader>
        {<CategoryTitle>{category.title}</CategoryTitle>}
        <AddNewProductButton
          to={{
            pathname: `/product/new`,
            state: { background: location, category }
          }}>
          Add New Product
        </AddNewProductButton>
      </ProductCatalogHeader>
      {isLoading && <h1>Loading...</h1>}
      <ProductsGrid className="product-grid">
        {!isLoading &&
          products &&
          products.length > 0 &&
          products.map((product, index) => (
            <ProductLink
              key={index}
              to={{
                pathname: `/product/${product.productNumber}`,
                state: { product, background: location }
              }}>
              <img
                src={`https://${process.env.REACT_APP_DOTCMS_URL}/${product.image}/400w/15q`}
                alt={product.title}
                loading="lazy"
                width="400"
              />
              <TitleOverlay className="title-overlay">
                <h3
                  dangerouslySetInnerHTML={{
                    __html: truncate(product.title, 37, true)
                  }}
                />
              </TitleOverlay>
            </ProductLink>
          ))}
      </ProductsGrid>
      {!isLoading && products && products.length === 0 && (
        <h1 style={{ fontSize: "20px", fontWeight: "300" }}>
          No products in this category
        </h1>
      )}
    </ProductsCatalogListContainer>
  );
}



export default ProductCatalog;
