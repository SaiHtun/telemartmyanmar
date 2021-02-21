import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_ITEM } from '../queries/query';
import { useParams, Link } from "react-router-dom";
import { NavContext } from "../context/NavContext";
//  variables
import { color } from "../constants/variables";
// import functions
import { currencyFormatter } from "../utility/functions";
// icons
import { FaAngleRight } from "react-icons/fa";
// components
import { ReactComponent as Loading } from "../assets/loading.svg";
import Options from '../components/OptionCard';
// SEO
import { Helmet } from "react-helmet";
import ColorCircle from "../components/ColorCircle";
import OptionCard from "../components/OptionCard";

function Item() {
  const { openNav } = useContext(NavContext);
  const { category, itemId } = useParams();
  const [imgData, setImgData] = useState({
    name: "iphone",
    url: "../assets/a1.jpg",
  });
  
 
  
  const { loading, error, data } = useQuery(GET_SINGLE_ITEM, {
    variables: { id: itemId },
  });



  useEffect(() => {
    if (data?.item.images.length) {
      setImgData({
        name: data.item.name,
        url: data.item.images[0].url,
      });
     
    }

    return () => {
      setImgData("");
    };
  }, [data]);

  if (loading)
    return (
      <LoadingWrapper>
        <Loading
          style={{ width: "50px", height: "50px", marginTop: "200px" }}
        ></Loading>
      </LoadingWrapper>
    );

  if (error) return <div>{error.message}</div>;

  const handleHover = (url, name) => {
    setImgData({ name, url });
  };


  const getHeader = (i) => {
    if (i === "smartphones") {
      return "Smart phones";
    } else if (i === "watchesandaccessories") {
      return "Watches and Accessories";
    } else if (i === "smarttv") {
      return "Smart TV";
    } else if(i === "electronics") {
      return "Electronics";
    } else if(i === "bestsellers") {
      return "Best Seller"
    } else {
      return "Discounts"
    }
  };

  const getContent = () => {
    if(category === "smartphones") {
      return "We've been distributing more than 20 brands including Apple, iphone, Huawei, Xiaomi and Samsung more than 10 years across Myanmar. "
    }else if(category === "watchesandaccessories") {
      return "due to the popularity of the smart watches, we've been added it into our main distribution channel very recently for our customers. "
    }else if(category === "smarttv") {
      return "We are now officially partnered with Xiaomi and distributing Xiaomi smart television and many other products as well."
    }else {
      return "We have been distributing the electronics devices more than 20 years, fair prices and better quality is our priority."
    }
  }
  const ImagesSection = data.item.images.length > 1 ? (
    <ImgWrapper>
      {/* img array container */}
      <ImgArrayContainer>
        {data.item.images.map((image, i) => {
          return (
            <Image
              src={image.url}
              key={i}
              alt={data.item.name}
              onMouseOver={() =>
                handleHover(image.url, data.item.name)
              }
              onClick={() =>
                handleHover(image.url, data.item.name)
              }
              primary={imgData.url === image.url ? true : false}
            ></Image>
          );
        })}
      </ImgArrayContainer>
      {/* main image */}
      <img
        className="itemImg"
        src={imgData.url}
        alt={imgData.name}
      />
    </ImgWrapper>
  ) : (
    <img
      className="itemImg"
      src={`${data.item.images[0].url}`}
      alt={`${data.item.name}`}
    />
  )

  const ramrom = data.item.ram && (
    <>
      <li><Left>RAM :</Left><Right>{data.item.ram}GB</Right> </li>
      <li><Left>ROM :</Left> <Right>{data.item.rom}GB</Right></li>
    </>
  )

  const isDiscount = data?.item.discount ? (
    <>
      <li>
        <Left>
          Discount :
        </Left>
        <Right >{data?.item.discount.value}%</Right>
      </li>
      <li>
        <Left>Original Price :</Left>
        <Right>{currencyFormatter(data.item.price)} Kyats</Right>
      </li>
      <li>
        <Left>Final Price :</Left>
        <Right>{currencyFormatter(
          Math.floor(
            data.item.price -
              data.item.price * (data.item.discount.value / 100)
          )
        )}{" "}
        Kyats
        </Right>
      </li>
    </>
  ) : (
    <li>
      <Left>Price :</Left> <Right>{currencyFormatter(data.item.price)}{" "}
      Kyats
      </Right>
    </li>
  )

  const isBestseller = data?.item.bestseller && (
    <li>
      <Left>Best Seller : </Left><Right>Yes</Right>
    </li>
  )

  const options = data.item.options && <Option>
    { 
      data.item.options.map((item) => {
        return (
          <OptionCard ram={item.ram} rom={item.rom} price={item.price} colors={item.color}></OptionCard>
        )
      })
    }
  </Option>


  return (
    <div style={{ backgroundColor: "white" }}>
      <Helmet>
          <meta charSet="utf-8" />
          <title>{data.item.name} | telemartmyanmar</title>
          <meta
            name="descriptions"
            content={getContent()}
          />
          <link rel="canonical" href="http://www.telemartmyanmar.com" />
        </Helmet>
      {data?.item ? (
        <ItemsContainer open={openNav}>
          <div className="container">
            <h3 className="header">
              <Link className="backHome" to="/">Home</Link>
              <FaAngleRight></FaAngleRight>
              <Link className="goCategory" to={`/${category}`}>
                  {getHeader(category)}{" "}
              </Link>
            </h3>
            <h3 className="itemName">{data?.item.name}</h3>
            <div className="item">
              { ImagesSection }

              {/* item info price, discount, best seller */}
              <div className="itemInfo">
                <ul className="itemMoreInfo">
                  { ramrom }
                  { isDiscount }
                  { isBestseller }
                  <li>
                    <Left>In Stock :</Left> <Right>{data.item.instock ? "Yes" : "No (Pre-Order Available)"}</Right>
                  </li>
                  <li className="colorsWrapper">
                      {data.item.color.map((color, i) => (
                        <ColorCircle key={i} color={color}></ColorCircle>
                      ))}
                  </li>
                </ul>
                {/*  optional phones */}
                { options? options: null }
                <p> {data.item.descriptions}</p>
                {/* items specification */}
                <ItemSpec>
                  {data.item.specs.map((spec, i) => {
                    return <li key={i}>{spec}</li>;
                  })}
                </ItemSpec>
                
              </div>
            </div>
          </div>
        </ItemsContainer>
      ) : (
        <StyledError>
          {" "}
          <h3>
            you are lost, go back <Link to="/">Home</Link>
          </h3>{" "}
        </StyledError>
      )}
      <MarginDiv />
    </div>
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

const ItemsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: max-content;
  background-color: white;

  ${(props) =>
    props.open &&
    css`
      max-height: 80vh;
      overflow-y: hidden;
    `}

  .container {
    width: 80vw;
    margin: auto;

    @media only screen and (max-width: 550px) {
      width: 90vw;
    }
    @media only screen and (max-width: 400px) {
      width: 95vw;
    }
  }

  .header {
    position: relative;
    margin-bottom: 40px;
    padding-top: 65px;
    display: flex;
    align-items: center;
    gap: 10px;

    .backHome {
      color: black;
    }

    .goCategory {
      color: ${color.lightBlue};
      display: flex;
      justify-content: flex-start;
      align-items: center;

      @media only screen and (max-width: 400px) {
        min-width: 200px;
      }
    }

    @media only screen and (max-width: 550px) {
      font-size: 15px;
      padding-top: 40px;
      margin-bottom: 30px;
    }
  }

  .itemName {
    /* width: 150px; */
    border-bottom: 1px solid #c2c0c0;
  }
  /*  Item's Image */
  .item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;

    @media only screen and (max-width: 1000px) {
      flex-direction: column;
    }

    @media only screen and (max-width: 500px) {
      margin: 0px 0px 20px 0px;
    }

    .itemImg {
      /* flex: 1; */
      width: 400px;
      object-fit: contain;

      @media only screen and (max-width: 500px) {
        margin: 15px 0;
        width: 300px;
      }
    }

    .itemInfo {
      width: 100%;
      padding: 20px;
      line-height: 20px;

      p {
        text-indent: 50px;
        font-size: 15px;
        opacity: 0.7;
      }

      .itemMoreInfo {
        margin: 20px 0px;
        list-style: none;

        .colorsWrapper {
          display: flex;
          width: max-content;
          gap: 10px;
          background-color: #dadada;
          border-radius: 10px;
          padding: 5px;
        }

      }
    }
  }
`;

const Left = styled.span`
  font-weight: 600;
`;

const Right = styled.span`
  font-size: 15px;
  color: rgba(0,0,0,0.8);
  margin-left: 10px;
  
`;

const StyledError = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgArrayContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media only screen and (max-width: 500px) {
    flex-direction: row;
    position: absolute;
    width: 100%;
    overflow-x: auto;
    bottom: 0px;
    left: 0px;
    justify-content: flex-start;

   
  }
`;

const Image = styled.img`
  width: 100px;
  object-fit: contain;
  margin-right: 5px;

  ${(props) =>
    props.primary &&
    css`
      border: 1px solid ${color.lightBlue};
    `}
`;

const ImgWrapper = styled.div`
  display: flex;
  position: relative;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    min-height: 450px;
  }
`;

const MarginDiv = styled.div`
  width: 100%;
  height: 100px;
  background-color: #fff;

  @media only screen and (max-width: 500px) {
    height: 50px;
  }
`;

const ItemSpec = styled.ul`
  padding-left: 12px;
  margin-top: 20px;
`;

const Option = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0px 20px 0px; 
`;

export default Item;
