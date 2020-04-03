import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components'
import { useSpring, animated } from "react-spring";

const ModalOverlay = styled.div`
  background: rgba(0,0,0, .1);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  overflow: hidden;
  height: 100vh;
`

const ModalContainer = styled.div`
  background: white;
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  width: 30%;
  z-index: 1;
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
  }, [location.state.background]);

  let back = e => {
    e.preventDefault();
    e.stopPropagation();
    history.goBack();
  };

  return (
    <animated.div style={animProps}>
      <GlobalStyle hidden={isModalOpen} />
      <ModalOverlay onClick={back} className="modal-overlay" />
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
