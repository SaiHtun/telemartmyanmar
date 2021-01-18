import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
// components
import Item from "../components/Item";
import Footer from "../components/Footer";
// assets
import a1 from "../assets/hero6.jpg";
import a2 from "../assets/hero1.png";
import a3 from "../assets/hero2.png";
import a4 from "../assets/hero3.png";
import sps from "../assets/gift.jpg";
import ads from "../assets/hero5.png";
import { ReactComponent as Loading } from '../assets/loading.svg';
import { color, fontSize } from "../constants/variables";
// context
import { ItemsContext } from "../context/ItemsContext";
import { NavContext } from "../context/NavContext";
// Carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// ads carousel
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
// carousel setting
import responsiveSetting from "../constants/carousel";

//  autoplay slider
const AutoplaySlider = withAutoplay(AwesomeSlider);

// Variables
const { lightBlue } = color;
const { cardTitleText, linkText, desText } = fontSize;
// eslint-disable-next-line

export default function Home() {
  const history = useHistory();
  // query with async cancellation.

  const { data } = useContext(ItemsContext);

  const { openNav } = useContext(NavContext);

  // grid Four items
  const gridFourItems = (name) => {
    let array = data && [...data.allItems.items];

    return array
      .sort(() => Math.random() - 0.5)
      .filter((item) => item[name])
      .slice(0, 4)
      .map((e, i) => {
        return (
          <div key={i} onClick={() => history.push(`/${e.category}/${e.id}`)}>
            <img src={e.imagesCollection.items[0].url} alt="gg" />
          </div>
        );
      });
  };
  // grid items
  const gridItems = (name) => {
    let array = data && [...data.allItems.items];

    return array
      .sort(() => Math.random() - 0.5)
      .filter((item) => item.category === name)
      .map((e, i) => {
        return <Item key={i} item={e}></Item>;
      });
  };

  const loading = data?.allItems.items.length < 1 && (
    <LoadingWrapper>
      <Loading style={{ width: "50px", height: "50px", marginTop: "200px"}}></Loading>
    </LoadingWrapper>
  )

  return (
    <Hero open={openNav}>
      { loading }
     
      <AutoplaySlider
        className="heroSlider"
        play={true}
        cancelOnInteraction={false}
        interval={6000}
        organicArrows={true}
        bullets={true}
        media={[
          {
            source: `${ads}`,
          },
          {
            source: `${a1}`,
          },
          {
            source: `${a2}`,
          },
          {
            source: `${a3}`,
          },
          {
            source: `${a4}`,
          },
        ]}
      ></AutoplaySlider>
      
     
      {/* showcase */}
      <Showcase>
        {/* Deals */}
        <ShowcaseItem>
          <h3>Deals</h3>
          <div className="showcaseGrid">
            {data && gridFourItems("discount")}
          </div>
          <Link to="/deals">Discover More</Link>
        </ShowcaseItem>

        {/* best sellers */}
        <ShowcaseItem>
          <h3>Best Seller</h3>
          <div className="showcaseGrid">
            {data && gridFourItems("bestseller")}
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
      <Ads></Ads>
      {/* row Smart phone & watch*/}
      <Row>
        <div className="rowTitle">
          <Link to="/smartphones">
            <h3>Smart phones</h3>
          </Link>{" "}
          <Link to="/smartphones">See all</Link>
        </div>
        {/* <div className="rowContainer"> */}
        <Carousel
          partialVisible
          responsive={responsiveSetting}
          className="slider"
        >
          {gridItems("smartphones")}
        </Carousel>

        {/* </div> */}
      </Row>
      <Row>
        <div className="rowTitle">
          <Link to="/watchesandaccessories">
            <h3>Watches and Accessories</h3>
          </Link>{" "}
          <Link to="/watchesandaccessories">See all</Link>
        </div>
        <Carousel
          swipeable
          partialVisible
          responsive={responsiveSetting}
          className="slider"
        >
          {gridItems("watchesandaccessories")}
        </Carousel>
      </Row>
      {/* row Smart TV */}
      <Row>
        <div className="rowTitle">
          <Link to="/smarttv">
            <h3>Smart TV</h3>{" "}
          </Link>
          <Link to="/smarttv">See all</Link>
        </div>
        <Carousel
          swipeable
          partialVisible
          responsive={responsiveSetting}
          className="slider"
        >
          {gridItems("smarttv")}
        </Carousel>
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
        <Carousel
          swipeable
          partialVisible
          responsive={responsiveSetting}
          className="slider"
        >
          {gridItems("electronics")}
        </Carousel>
      </Row>
      <Footer></Footer>
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

  .heroSlider {
    height: 70vh;
    margin-top: -6px;
    margin-bottom: -150px;

    .awssld__bullets {
      position: absolute;
      top: 30%;
      z-index: 2;
    }

    .awssld__content {
      position: relative;

      ::before {
        content: "";
        position: absolute;
        z-index: 10;
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

    .awssld__bullets button {
      width: 10px;
      height: 10px;
      background-color: white;
    }
  }

  a {
    color: ${lightBlue};
  }

  ::-webkit-scrollbar {
    background-color: red;
  }

  @media only screen and (max-width: 600px) {
    height: 100vh;
  }
`;

// ###################################### Showcase ######################################
const Showcase = styled.div`
  margin: 0 20px;
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
  @media only screen and (max-width: 900px) {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: auto;
    margin-bottom: 5px;
    :hover {
      overflow-x: hidden;
    }
  }

  @media only screen and (max-width: 500px) {
    margin: 0 0;
    :hover {
      overflow-x: hidden;
    }
  }
`;

// ###################################### ShowcaseItem ######################################
const ShowcaseItem = styled.div`
  min-width: 270px;
  width: 350px;
  height: 420px;
  margin: 10px;
  padding: 15px;
  background-color: white;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  height: max-content;
  z-index: 2;

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
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 150px);
    gap: 10px;
    margin: 30px 0;

    img {
      width: 100%;
      height: 100%;
      transition: transform 0.3s ease-out;
      object-fit: cover;
    }

    img:hover {
      transform: scale(1.1);
    }
  }

  @media only screen and (max-width: 1000px) {
    min-width: 280px;
  }
  @media only screen and (max-width: 900px) {
    min-width: 280px;
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

Ads.defaultProps = {
  src: ads,
};

// ###################################### row ######################################
const Row = styled.div`
  margin: 0px 30px;
  min-height: 450px;
  height: max-content;
  padding: 30px 20px;
  background-color: #fff;
  margin-bottom: 15px;

  .slider {
    ul {
      margin-top: 30px;

      li {
        min-width: 250px !important;
        max-width: 280px;
        height: max-content;
        margin: 0px 5px;

        @media only screen and (max-width: 800px) {
          margin: 0px 20px;
        }
        @media only screen and (max-width: 500px) {
          margin: 0px 10px;
        }
      }
    }
  }

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

const info = {
  name: "Samsung",
  title: "Smart phone and watch",
  img: [sps, sps, sps, sps],
};








