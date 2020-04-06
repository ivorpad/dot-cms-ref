import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import loading from '../loading.svg'
import Img from "react-image";
import styled, { css } from "styled-components";
import { price, media } from "../utils/media";

const isSingle = css`
  background: white;
  padding: 3rem;
  ${media.md`width: 78.25%;`};
  ${media.lg`width: 72.25%;`};
  width: 100%;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* {only when product is seen from single page} */
  ${props => (!props.isModal ? isSingle : "")}
  margin-left: auto;
  img {
    align-self: center;
    margin-bottom: 2rem;
    height: 30%;
    object-fit: contain;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  .product__category {
    color: ${props => props.theme.main.gray};
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  .product__price {
    margin-top: 2rem;
    margin-bottom: 3rem;
    font-size: 18px;
  }

  p {
    line-height: 1.5;
    color: #444;
  }

  ul {
    margin-top: 1rem;
    list-style: disc;
    margin-left: 1rem;
    li {
      margin-bottom: 1rem;
    }
  }
`;

function Product() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProductById = async () => {
      const product = await fetch(
        `https://${process.env.REACT_APP_DOTCMS_API_URL}/content/render/false/type/json/query/-contentType:forms%20+contentType:Product%20+(conhost:${process.env.REACT_APP_DOTCMS_CONNHOST}%20conhost:SYSTEM_HOST)%20+(Product.productNumber:*${id}*%20Product.productNumber_dotraw:*${id}*)%20+languageId:1%20+deleted:false%20+working:true/orderby/score,modDate%20desc/depth/2`
      ).then(results => results.json());
      setProduct(product.contentlets?.[0]);
    };

    try {
      setProduct(location.state.product);
    } catch (error) {
      fetchProductById();
    }
  }, [location.state, id]);
  
  return (
    <ProductContainer isModal={!!location.state?.background}>
      {product ? (
        <>
          <Img
            src={`https://${process.env.REACT_APP_DOTCMS_URL}/${product.image}/w400/q20`}
            width={400}
            alt={product.title}
            loading="lazy"
            loader={
              <img src={loading} width="32" className="App-logo" alt="logo" />
            }
          />
          <h3>{product.title}</h3>
          <span className="product__category">
            {product.productLine[0].title}
          </span>
          <div
            className="product__description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <div className="product__price">
            <span>{price.format(product.retailPrice.replace(/,/g, ""))}</span>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </ProductContainer>
  );
}

export default Product;
