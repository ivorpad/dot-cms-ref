import React from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

const ModalOverlay = styled.div`
  background: rgba(0,0,0, .1);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
`

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  width: 30%;
`

function Modal({component}) {
  let history = useHistory();

  let back = e => {
    e.preventDefault();
    e.stopPropagation();
    history.goBack();
  };

  return (
    <ModalOverlay onClick={back}>
      <ModalContainer>
        <a href="#back" onClick={back}>
          close
        </a>
        {component}
      </ModalContainer>
    </ModalOverlay>
  );
}

export default Modal
