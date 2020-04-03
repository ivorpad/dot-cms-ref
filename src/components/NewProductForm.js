import React from 'react'
import { useParams, useLocation } from "react-router-dom";

function NewProductForm() {

  const location = useLocation();
  console.log(location.state);
  return (
    <form>
      <input type="text" name="title" id="title" value={location.state.category}/>
    </form>
  )
}

export default NewProductForm
