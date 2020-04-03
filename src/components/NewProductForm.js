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

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append(
          "Authorization",
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcGk0ZTdkZTYwZC1jMjNkLTQ4OGEtYjY2MS05ZTcyOTI0ZGI5MjEiLCJ4bW9kIjoxNTg1OTM3NDM2MDAwLCJuYmYiOjE1ODU5Mzc0MzYsImlzcyI6ImZjZGQ5YTBkLTQxNmYtNGJlOC1hMWViLTM5MzEwMzM1YjgxYSIsImxhYmVsIjoicmVhY3RBcHAyIiwiZXhwIjoxNjgwNDcyODAxLCJpYXQiOjE1ODU5Mzc0MzYsImp0aSI6IjUwY2ViN2I2LTUyMWQtNGY0Ni1hMGViLTk4YzZiMTVlNmVkOSJ9.54w-IVfhvIo3ZUwsE_7UGWwH8hYjwnGcZmTPE4YTADk"
        );
        myHeaders.append(
          "Cookie",
          "JSESSIONID=051933BF9F415AE23471D2F9B74EEF81; BACKENDID=172.24.0.3"
        );

        var formdata = new FormData();
        formdata.append("title", "some title");
        formdata.append("contentType", "Product");
        formdata.append("urlTitle", "test-title");
        formdata.append("productLine", "b2b541ec-611a-480d-90d8-c2af1c692816");
        formdata.append("retailPrice", "999");
        formdata.append("productNumber", productNumber);
        formdata.append("image", imageRef.current.files[0]);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow"
        };

        fetch("https://demo.dotcms.com/api/content/publish/1", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log("error", error));

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
