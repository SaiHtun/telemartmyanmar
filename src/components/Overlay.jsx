import React, { useContext } from "react";
import styled, { css, keyframes } from "styled-components";
import { NavContext } from "../context/NavContext";

const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 0.5;
  }
`;

const OverlayContainer = styled.div`
  ${(props) =>
    props.open &&
    css`
      height: 100vh;
      overflow-y: hidden;
      position: fixed;
      width: 100vw;
      height: 100vh;
      background-color: black;
      animation: ${fade} 1s ease-in-out;
      opacity: 0.5;
      z-index: 20;
    `}
`;

function Overlay() {
  const { openNav, setOpenNav } = useContext(NavContext);

  return (
    <OverlayContainer
      open={openNav}
      onClick={() => setOpenNav(false)}
    ></OverlayContainer>
  );
}

export default Overlay;
