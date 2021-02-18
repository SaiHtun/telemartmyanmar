import React from "react";
import styled from "styled-components";
// Carousel
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// carousel setting
import responsiveSetting from "../constants/carousel";

export default function Carousel(props) {
  return (
    <Container>
      <MultiCarousel
        swipeable={true}
        responsive={responsiveSetting}
        className="slider"
        removeArrowOnDeviceType={["mobile"]}
        keyBoardControl={true}
        // infinite={true}
      >
        {props.children}
      </MultiCarousel>
      <MobileCarousel>{props.children}</MobileCarousel>
    </Container>
  );
}

const Container = styled.div`
  .slider {
    ul {
      margin-top: 30px;
      overflow-y: hidden;
      margin-bottom: 5px;

      li {
        margin-bottom: 30px;
      }
    }

    @media only screen and (max-width: 500px) {
      display: none;
    }
  }
`;

const MobileCarousel = styled.div`
  display: none;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  margin-top: 40px;

  @media only screen and (max-width: 500px) {
    display: flex;
    gap: 15px;
  }
`;
