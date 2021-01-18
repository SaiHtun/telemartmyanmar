import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ITEM } from "../queries/query";
import { useParams, Link } from "react-router-dom";
import { NavContext } from "../context/NavContext";
//  variables
import { color } from "../constants/variables";
// import functions
import { currencyFormatter } from "../utility/functions";
// icons
import { FaArrowCircleLeft } from "react-icons/fa";
// components
import Footer from "../components/Footer";
import { ReactComponent as Loading } from '../assets/loading.svg';

function Item() {
  const { openNav } = useContext(NavContext);
  const { category, itemId } = useParams();
  const [imgData, setImgData] = useState({
    name: "iphone",
    url: "../assets/a1.jpg",
  });
  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: { itemId: itemId },
  });

  useEffect(() => {
    if (data?.items.imagesCollection.items.length) {
      setImgData({
        name: data.items.name,
        url: data.items.imagesCollection.items[0].url,
      });
    }

    return () => {
      setImgData("");
    };
  }, [data]);

  if(loading) return (
    <LoadingWrapper>
      <Loading style={{ width: "50px", height: "50px", marginTop: "200px" }}></Loading>
    </LoadingWrapper>
  )

  if (error) return <div>{error.message}</div>;

  const handleClick = (url, name) => {
    setImgData({ name, url });
  };

  const discount = data?.items.discount && (
    <span>
      Discount :{" "}
      <span style={{ fontWeight: 400 }}>{data?.items.discount}%</span>
    </span>
  );

  return (
    <div style={{ backgroundColor: "white" }}>
      {data?.items ? (
        <ItemsContainer open={openNav}>
          <div className="container">
            <h3 className="header">
              <Link to={`/${category}`}>
                <span className="category">
                  <FaArrowCircleLeft
                    style={{ marginRight: "5px" }}
                  ></FaArrowCircleLeft>
                  {getHeader(data?.items.category)}{" "}
                </span>{" "}
              </Link>{" "}
            </h3>
            <h3 className="itemName">{data?.items.name}</h3>
            <div className="item">
              {data.items.imagesCollection.items.length > 1 ? (
                <ImgWrapper>
                  {/* img array container */}
                  <ImgArrayContainer>
                    {data.items.imagesCollection.items.map((image, i) => {
                      return (
                        <Image
                          src={image.url}
                          key={i}
                          alt={data.items.name}
                          onClick={() =>
                            handleClick(image.url, data.items.name)
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
                  src={`${data.items.imagesCollection.items[0].url}`}
                  alt={`${data.items.name}`}
                />
              )}

              {/* item info price, discount, best seller */}
              <div className="itemInfo">
                <p> {data.items.descriptions} </p>
                {/* items specification */}
                <ItemSpec>
                  {data?.items.specs.map((spec, i) => {
                    return <li key={i}>{spec}</li>;
                  })}
                </ItemSpec>
                <ul className="itemMoreInfo">
                  <li>{discount}</li>
                  {data?.items.bestseller && (
                    <li>
                      <span>Best Seller : </span> Yes{" "}
                    </li>
                  )}
                  {data?.items.discount ? (
                    <>
                      <li>
                        <span>Original Price</span>:{" "}
                        {currencyFormatter(data?.items.price)} Kyats
                      </li>
                      <li>
                        <span>Final Price</span>:{" "}
                        {currencyFormatter(
                          Math.floor(
                            data?.items.price -
                              data?.items.price * (data.items.discount / 100)
                          )
                        )}{" "}
                        Kyats
                      </li>
                    </>
                  ) : (
                    <li>
                      <span>Price</span>: {currencyFormatter(data?.items.price)}{" "}
                      Kyats
                    </li>
                  )}
                  <li>
                    <span>In Stock :</span> {data.items.instock ? "Yes" : "No"}
                  </li>
                </ul>
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
      <Footer></Footer>
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

    .category {
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
    margin-top: 30px;

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

        span {
          font-weight: bold;
        }
      }
    }
  }
`;

const StyledError = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getHeader = (i) => {
  if (i === "smartphoneandwatch") {
    return "Smart phone and watch";
  } else if (i === "accessories") {
    return "Accessories";
  } else if (i === "smarttv") {
    return "Smart TV";
  } else {
    return "Electronics";
  }
};

// const Loading = styled.div`
//   width: 100%;
//   height: 80vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const ImgArrayContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 500px) {
    flex-direction: row;
    position: absolute;
    width: 100%;
    overflow-x: auto;
    bottom: 0px;
    left: 0px;
    justify-content: flex-start;

    ::-webkit-scrollbar {
      display: block;
    }
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
  list-style: none;
  margin-top: 20px;
`;

export default Item;
