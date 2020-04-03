import React, { createRef } from 'react'
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
  const imageRef = createRef()

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

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append(
          "Authorization",
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcGkzNWUzNThiZC00NDAwLTQ0YzUtOTNjZS0zYTdiNjExM2EwOWQiLCJ4bW9kIjoxNTg1OTMwNDAxMDAwLCJuYmYiOjE1ODU5MzA0MDEsImlzcyI6ImZjZGQ5YTBkLTQxNmYtNGJlOC1hMWViLTM5MzEwMzM1YjgxYSIsImxhYmVsIjoicmVhY3QgYXBwIiwiZXhwIjoxNjgwNDcyODAwLCJpYXQiOjE1ODU5MzA0MDEsImp0aSI6IjcwNzI5OGU4LTdmNDEtNGZlYy04N2E4LWI2NDNlODhmNGY1OSJ9.Wj01r7uHJvO_6ZyuRvDpp4tkEFpEHpfvQgIfRALp5gc"
        );
        myHeaders.append(
          "Cookie",
          "JSESSIONID=051933BF9F415AE23471D2F9B74EEF81; BACKENDID=172.24.0.3"
        );

        const formData = new FormData();

        for (const name in formValues) {
          formData.append(name, formValues[name]);
        }

        formData.append("image", imageRef.current.files[0], "file-name");

        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }

        const options = {
          method: "POST",
          headers: myHeaders,
          body: formData,
          redirect: "follow"
        };

        const submit = await fetch(
          `https://demo.dotcms.com/api/content/publish/1`,
          options
        )
        .then(result => console.log(result))
        .catch(error => console.log("error", error));

        console.log({ data, submit, options });
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
