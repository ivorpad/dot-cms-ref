import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components'
import { useSpring, animated } from "react-spring";

const ModalOverlay = styled.div`
  background: rgba(0, 0, 0, 0.1);
  z-index: 0;
  height: 100vh;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ModalContainer = styled.div`
  top: 0;
  background: white;
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  margin-top: 3.75rem;
  padding: 3rem;
  width: 30%;
  z-index: 1;
  background-color: white;
  overflow: overlay;
  min-height: 300px;
  max-height: 722px;
  overflow: scroll;
  border-radius: 3px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow: ${props => (props.hidden ? "hidden" : "visible")};
  }
`;

function Modal({ component }) {
  const animProps = useSpring({
    to: [
      { opacity: 1, top: "0" },
    ],
    from: { opacity: 0, top: "50px" }
  });
  let history = useHistory();
  let location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.state.background) {
      setIsModalOpen(() => !isModalOpen);
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state.background]);

  let back = e => {
    e.preventDefault();
    e.stopPropagation();
    history.goBack();
  };

  return (
    <animated.div style={animProps}>
      <GlobalStyle hidden={isModalOpen} />
      <ModalOverlay
        onClick={back}
        className="modal-overlay"
      />
      <ModalContainer>
        <a href="#back" onClick={back}>
          close
        </a>
        {component}
      </ModalContainer>
    </animated.div>
  );
}

export default Modal
