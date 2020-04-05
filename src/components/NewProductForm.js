import React, { useRef } from 'react'
import { useLocation, Link } from "react-router-dom";
import styled from 'styled-components'
import {
  useCategories
} from "../shared/contexts/categories.context";
import {PrimaryButton} from '../styles/shared'
//import PropTypes from "prop-types";

const FormControl = styled.div`
  margin-bottom: 1rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.5rem;
  border-radius: 3px;
  font-size: 14px;
  color: ${props => props.theme.main.gray};
  border: none;
  background: ${props => props.theme.main.mediumGray};
    &:focus {
      background: white;
      box-shadow: 0px 0px 1px 0px rgba(0,0,0,1);
      outline: none;
    }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: none;
  height: 37px;
  font-size: 14px;
  background: ${props => props.theme.main.mediumGray};
  &:focus {
    background: white;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 1);
    outline: none;
  }
  color: ${props => props.theme.main.gray};
`;

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
        H.append("Authorization", "Bearer bearer_token");

        H.append(
          "Cookie",
          "BACKENDID=172.24.0.3; JSESSIONID=5CB1D4B0D161CA1FC34EEE68681374E0"
        );

        const formData = new FormData();

        for (const name in formValues) {
          formData.append(name, formValues[name]);
        }

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
          .then(result => console.log({ result }))
          .catch(error => console.log("error", error));

        console.log({ data, results, options });
      }}>
      <FormControl>
        <Input
          onChange={handleForm}
          type="text"
          name="title"
          id="title"
          placeholder="Product title"
          value={formValues.title}
        />
      </FormControl>
      <FormControl>
        <Select
          name="productLine"
          id="category"
          onChange={handleForm}
          value={location.state.category.identifier}>
          {categories.map((category, index) => (
            <option key={category.identifier} value={category.identifier}>
              {category.title}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <Input
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
          style={{marginBottom: '1.5rem'}}
        />
      </FormControl>

      <FormControl>
        <PrimaryButton>Submit</PrimaryButton>
      </FormControl>
    </form>
  );
}

export default NewProductForm
