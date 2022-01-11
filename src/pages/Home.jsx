import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
// components
import Item from "../components/Item";
import Carousel from "../components/Carousel";
// assets

import sps from "../assets/gift.jpg";
import { ReactComponent as Loading } from "../assets/loading.svg";
import { color, fontSize } from "../constants/variables";
// context
import { NavContext } from "../context/NavContext";
// apollo graphql query
import { useQuery } from "@apollo/client";
import { GET_HOME } from "../queries/query";
// carousels
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as HeroCarousel } from 'react-responsive-carousel';
// SEO
import { Helmet } from "react-helmet";

// Variables
const { lightBlue } = color;
const { cardTitleText, linkText, desText } = fontSize;
// eslint-disable-next-line

export default function Home() {
  const history = useHistory();

  const { openNav } = useContext(NavContext);

  // home query
  const { loading, error, data } = useQuery(GET_HOME);

  if (loading)
    return (
      <LoadingWrapper>
        <Loading
          style={{ width: "50px", height: "50px", marginTop: "200px" }}
        ></Loading>
      </LoadingWrapper>
    );
  if (error) return <h1>{error.message}...</h1>;

  const gridItems = (category) => {
    let array = data && [...data[category].items];

    return array.map((item) => {
      return <Item key={item.id} item={item}></Item>;
    });
  };

  const styleObject = {
    cursor: "pointer",
  };

  const getShowcase = (str) => {
    return data[str][0]?.items.map((item) => {
      return (
        <img
          onClick={() => history.push(`${str}/${item.id}`)}
          style={styleObject}
          key={item.id}
          src={item.images[0].url}
          alt={item.name}
        ></img>
      );
    });
  };

  return (
    <Hero open={openNav}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | telemartmyanmar</title>
        <meta
          name="descriptions"
          content="The biggest and most reliable mobile phones, watches, smart tv, electronics devices distributor in Myanmar"
        />
        <link rel="canonical" href="http://www.telemartmyanmar.com" />
      </Helmet>
      <HeroCarousel 
        autoPlay={true}
        showThumbs={false}
        infiniteLoop={true}
        dynamicHeight={false}
      >
        {[...data.homes[0].slidingImages].map((p, i) => {
          return (
            <Slide key={i}>
              <img className="slideImg" src={p.url} alt={p.url}/>
            </Slide>
          )
        })}
      </HeroCarousel>
      <MobileWrapper>
        <MobileHero src={data.homes[0].heroMobileImage.url}></MobileHero>
      </MobileWrapper>
      {/* showcase */}
      <Showcase>
        {/* Deals */}
        <ShowcaseItem>
          <h3>Discounts</h3>
          <div className="showcaseGrid">{data && getShowcase("discounts")}</div>
          <Link to="/discounts">Discover More</Link>
        </ShowcaseItem>

        {/* best sellers */}
        <ShowcaseItem>
          <h3>Best Seller</h3>
          <div className="showcaseGrid">
            {data && getShowcase("bestsellers")}
          </div>
          <Link to="/bestsellers">Discover More</Link>
        </ShowcaseItem>

        {/* gift items */}
        <ShowcaseItem giftItem="true">
          <h3>Gift items</h3>
          <div className="showcaseGrid">
            {info.img.map((e, i) => {
              return <img src={e} alt="gg" key={i} />;
            })}
          </div>
          <Link to="bestsellers">Discover More</Link>
        </ShowcaseItem>
      </Showcase>
      {/* ads */}
      <Ads src={data.homes[0].adsImage.url}></Ads>
      {/* row Smart phone & watch*/}
      <Row>
        <div className="rowTitle">
          <Link to="/smartphones">
            <h3>Smart phones</h3>
          </Link>{" "}
          <Link to="/smartphones">See all</Link>
        </div>
        <Carousel>
          {data["smartphones"].items.length && gridItems("smartphones")}
        </Carousel>
      </Row>
      <Row>
        <div className="rowTitle">
          <Link to="/watchesandaccessories">
            <h3>Watches and Accessories</h3>
          </Link>{" "}
          <Link to="/watchesandaccessories">See all</Link>
        </div>
        <Carousel>{gridItems("watchesandaccessories")}</Carousel>
      </Row>
      {/* row Smart TV */}
      <Row>
        <div className="rowTitle">
          <Link to="/smarttv">
            <h3>Smart TV</h3>{" "}
          </Link>
          <Link to="/smarttv">See all</Link>
        </div>
        <Carousel>{gridItems("smarttv")}</Carousel>
      </Row>
      {/* row  Electronics */}
      <Row>
        <div className="rowTitle">
          <Link to="/electronics">
            {" "}
            <h3>Electronics</h3>{" "}
          </Link>
          <Link to="/electronics">See all</Link>
        </div>
        <Carousel>{gridItems("electronics")}</Carousel>
      </Row>
    </Hero>
  );
}

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: flex-start;
`;

const Slide = styled.div`
  height: 500px;
  margin-top: -6px;
  ::after {
        content: "";
        position: absolute;
        z-index: 10;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background-image: linear-gradient(
          to top,
          rgba(239, 239, 239, 255),
          rgba(239, 239, 239, 0)
        );
      }
  

  @media only screen and (max-width: 600px) {
      display: none;
  }

  .control-dots {
      position: absolute;
      top: 300px;
      z-index: 2;
    }
`;

const Hero = styled.div`
  width: 100vw;
  max-width: 1450px;
  margin: 0 auto;
  min-height: 80vh;
  font-family: "Roboto", sans-serif;
  z-index: -10;

  ${(props) =>
    props.open &&
    css`
      max-height: 100vh;
      max-height: 90vh;
      overflow-y: hidden;
    `}
   

  a {
    color: ${lightBlue};
  }

  ::-webkit-scrollbar {
    background-color: red;
  }
`;

// ###################################### Showcase ######################################
const Showcase = styled.div`
  margin: 0 20px;
  margin-top: -100px;
  height: 460px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #d4d3d3;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${lightBlue};
  }

  @media only screen and (max-width: 1200px) {
    justify-content: flex-start;
  }

  @media only screen and (max-width: 500px) {
    margin: 0 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: auto;

    :hover {
      overflow-x: hidden;
    }
  }
`;

// ###################################### ShowcaseItem ######################################
const ShowcaseItem = styled.div`
  min-width: 330px;
  width: 350px;
  height: 420px;
  margin: 10px;
  padding: 15px;
  background-color: white;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  height: max-content;
  z-index: 2;
  overflow: hidden;

  h3 {
    font-size: ${cardTitleText};
    font-weight: 500;
  }

  a {
    font-size: ${linkText} !important;
    color: ${lightBlue};
  }

  .showcaseGrid {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(2, 150px);
    grid-template-rows: repeat(2, 150px);
    gap: 10px;
    margin: 30px 0;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease-out;
      object-fit: cover;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  @media only screen and (max-width: 900px) {
    margin-bottom: 10px;

    ${(props) =>
      props.giftItem &&
      css`
        display: none;
      `}
  }
  @media only screen and (max-width: 600px) {
    margin-bottom: 5px;
  }
`;

// ###################################### Ads ######################################
const Ads = styled.img`
  width: 100%;
  margin: 10px 0;

  @media only screen and (max-width: 800px) {
    margin: 10px 0px;
  }
  @media only screen and (max-width: 500px) {
    margin: 5px 0px;
  }
`;

// ###################################### row ######################################
const Row = styled.div`
  margin: 0px 30px;
  margin-bottom: 5px;
  min-height: 450px;
  height: max-content;
  padding: 30px 20px 10px 20px;
  background-color: #fff;
  margin-bottom: 15px;

  @media only screen and (max-width: 800px) {
    margin: 0px;
    margin-bottom: 5px;
  }
  @media only screen and (max-width: 500px) {
    padding: 30px 15px;
    margin-bottom: 5px;
  }

  .rowTitle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      position: relative;
      color: black;

      ::after {
        position: absolute;
        content: "";
        height: 3px;
        bottom: -6px;
        margin: 0;
        left: 0;
        right: 0;
        width: 50%;
        background: ${lightBlue};
        -o-transition: 0.5s;
        -ms-transition: 0.5s;
        -moz-transition: 0.5s;
        -webkit-transition: 0.5s;
        transition: 0.5s;
      }

      :hover::after {
        width: 100%;
      }
    }
  }

  .rowItem {
    min-width: 100%;
    height: 100%;
    text-align: center;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    .discountItem {
      position: absolute;
      z-index: 10;
      top: 15px;
      right: 20px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f0556f;
      color: white;
      font-size: 13px;
    }

    @media only screen and (max-width: 500px) {
      margin: 5px;
      text-align: left;
    }

    .imgContainer {
      width: 100%;
      height: 240px;
      transition: all 0.5s ease-out;

      :hover {
        transform: scale(1.1);
      }

      @media only screen and (max-width: 500px) {
        :hover {
          transform: none;
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @media only screen and (max-width: 500px) {
        margin: 5px;
        text-align: left;

        :hover {
          transform: none;
        }
      }
    }

    .itemInfo {
      padding: 5px;
      line-height: 20px;
      z-index: 10;
      margin-top: 5px;
      .itemTitle {
        font-weight: 500;
      }

      .itemDes {
        font-size: ${desText};
        color: #676767;
      }

      .itemDiscount {
        text-decoration: line-through;
        color: grey;
      }
    }
  }
`;

const MobileHero = styled.img`
  width: 100vw;
  object-fit: contain;
  display: none;
  margin-bottom: -150px;
  /* position: relative; */

  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const MobileWrapper = styled.div`
  position: relative;

  @media only screen and (max-width: 600px) {
    ::before {
      content: "";
      position: absolute;
      z-index: 1;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 200px;
      background-image: linear-gradient(
        to top,
        rgba(239, 239, 239, 255),
        rgba(239, 239, 239, 0)
      );
    }
  }
`;

const info = {
  name: "Samsung",
  title: "Smart phone and watch",
  img: [sps, sps, sps, sps],
};
