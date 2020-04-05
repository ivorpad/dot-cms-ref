import React, { useRef } from 'react'
import { useLocation } from "react-router-dom";
import styled from 'styled-components'
import slugify from 'react-slugify'
import {
  useCategories
} from "../shared/contexts/categories.context";
//import PropTypes from "prop-types";

const FormControl = styled.div``

function NewProductForm() {
  const location = useLocation();
  const categories = useCategories();
  const imageRef = useRef(null)

  const initialState = {
    title: "Some title",
    contentType: "Product",
    urlTitle: "some-title",
    productLine: location.state.category.identifier,
    retailPrice: "999",
    productNumber: "as65d4s6deasasa",
  };

  const [formValues, setFormValues] = React.useState(initialState);

  const handleForm = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  console.log(formValues);
  
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();

        const productNumber = Math.random()
          .toString(16)
          .slice(-8);

        const data = {
          ...formValues,
          productNumber
        };

        const H = new Headers();
        H.append("Content-Type", "multipart/form-data");
        H.append(
          "Authorization",
          "Bearer bearer_token"
        );

        H.append(
          "Cookie",
          "BACKENDID=172.24.0.3; JSESSIONID=5CB1D4B0D161CA1FC34EEE68681374E0"
        );

        const formData = new FormData();

        for (const name in formValues) {
          formData.append(name, formValues[name]);
        }
        console.log(imageRef.current.files[0]);
        formData.append("image", imageRef.current.files[0]);

        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }

        const options = {
          method: "POST",
          headers: H,
          body: formData,
          redirect: "follow"
        };

        const results = await fetch(
          `https://demo.dotcms.com/api/content/publish/1`,
          options
        )
        .then(result => result.text())
        .then(result => console.log({result}))
        .catch(error => console.log("error", error));

        console.log({ data, results, options });
      }}>
      <FormControl>
        <input
          onChange={handleForm}
          type="text"
          name="title"
          id="title"
          placeholder="Product title"
          value={formValues.title}
        />
      </FormControl>
      <FormControl>
        <select
          name="productLine"
          id="category"
          onChange={handleForm}
          value={location.state.category.identifier}>
          {categories.map((category, index) => (
            <option key={category.identifier} value={category.identifier}>
              {category.title}
            </option>
          ))}
        </select>
      </FormControl>

      <FormControl>
        <input
          onChange={handleForm}
          type="number"
          name="retailPrice"
          id="price"
          placeholder="Price"
          value={formValues.retailPrice}
        />
      </FormControl>

      <FormControl>
        <input
          type="file"
          name="image"
          id="image"
          ref={imageRef}
          accept="image/x-png,image/jpeg"
        />
      </FormControl>

      <FormControl>
        <input type="submit" name="submit" id="submit" />
      </FormControl>
    </form>
  );
}

export default NewProductForm
