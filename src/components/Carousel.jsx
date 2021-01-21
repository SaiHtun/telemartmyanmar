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
      >
        {props.children}
      </MultiCarousel>
      <MobileCarousel>
          {props.children}
      </MobileCarousel>
    </Container>
  );
}

const Container = styled.div`
  .slider {
    ul {
      margin-top: 30px;

      li {
        min-width: 170px !important;
        max-width: 180px;
        height: max-content;
        margin: 0px 5px;

        @media only screen and (max-width: 800px) {
          margin: 0px 20px;
        }
        @media only screen and (max-width: 500px) {
          margin: 0px;
          max-width: 170px;
        }
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
  margin-top: 20px;

  @media only screen and (max-width: 500px ) {
    display: flex;
  }
`;
