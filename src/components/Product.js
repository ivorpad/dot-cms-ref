import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

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
    <div>
      {product ? (
        <>
          <h1>{product.title}</h1>
          <h3>Category: {product.productLine[0].title}</h3>
          <img
            src={`https://${process.env.REACT_APP_DOTCMS_URL}/${product.image}/w400/q20`}
            width={400}
            alt={product.title}
            loading="lazy"
          />
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

export default Product;
