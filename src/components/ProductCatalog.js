import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useCategories } from '../shared/contexts/categories.context';

const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`

const Product = styled.div`
  img {
    width: 100%
  }
`

function ProductCatalog() {

  const categories = useCategories();

  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");

  const categoryFiltered = useMemo(
    () => categories.filter(category => category.identifier === id)
  , [categories, id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const products = await fetch(
          `https://${process.env.REACT_APP_DOTCMS_API_URL}/content/render/false/query/-contentType:forms%20+contentType:Product%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+Product.productLine:${id}%20+languageId:1%20+deleted:false%20+working:true/orderby/score,modDate%20desc`
        ).then(results => results.json());

        setProducts(() => products.contentlets);
        setIsLoading(false);
      } catch (error) {
        // Set error message
        setIsLoading(false);
      }
    };
    fetchProducts();
    categoryFiltered.map(category => setCategory(category.title));
  }, [id, categoryFiltered]);

  return (
    <Products>
      {<h1>{category}</h1>}
      {isLoading && <h1>Loading...</h1>}

      {!isLoading &&
        products &&
        products.length > 0 &&
        products.map((product, index) => (
          <Product key={index}>
            <img
              src={`https://${process.env.REACT_APP_DOTCMS_URL}/${product.image}/400w/15q`}
              alt={product.title}
              loading="lazy"
              width="400"
            />
            <h3>{product.title}</h3>
          </Product>
        ))}

      {!isLoading && products && products.length === 0 && (
        <h1 style={{ fontSize: "24px" }}>No products in this category</h1>
      )}
    </Products>
  );
}



export default ProductCatalog;
