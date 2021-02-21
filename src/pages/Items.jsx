import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

// queries
import Query from "../queries/queryTypes";
import { NavContext } from "../context/NavContext";
// tv
import tv from "../assets/hero1.png";
// phone
import phone from "../assets/hero2.png";
// watch
import watch from "../assets/hero4.png";
// elec
import electronics from "../assets/hero6.jpg";
// SEO
import { Helmet } from "react-helmet";

//  variables
import { color } from "../constants/variables";
// components
import Item from "../components/Item";
import { ReactComponent as Loading } from "../assets/loading.svg";
// utility functions
import { currencyFormatter } from "../utility/functions";

function Items() {
  const [array, setArray] = useState([]);
  const [tempArray, setTempArray] = useState([]);
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const { openNav } = useContext(NavContext);
  // params
  const { category } = useParams();

  const l = useLocation();
  // pagination
  const { loading, error, data, fetchMore } = useQuery(Query[category]);


  useEffect(() => {
    if(data && data.itemsConnection.edges.length) {

      setArray(Array.from(data.itemsConnection.edges));
      setTempArray(Array.from(data.itemsConnection.edges));
      let priceArray =  data.itemsConnection.edges.map((item) => item.node.price);
      let defaultPrice =  Math.max(...priceArray) ;
      let minPrice =  Math.min(...priceArray) ;
      defaultPrice && setPrice(defaultPrice);
      defaultPrice && setMaxPrice(defaultPrice);
      minPrice && setMinPrice(minPrice);
    }

    return () => {
      setArray([])
    }
  }, [data, category]);

  if(loading) return (
    <LoadingWrapper>
      <Loading
        style={{ width: "50px", height: "50px", marginTop: "200px" }}
      ></Loading>
    </LoadingWrapper>
  )
  

  const allItems = () => {

    if (loading) {
      return (
        <LoadingWrapper>
          <Loading
            style={{ width: "50px", height: "50px", marginTop: "200px" }}
          ></Loading>
        </LoadingWrapper>
      );
    } else if (error) {
      console.error(error.message);
    } else {
      return array.map((item) => {
        return (
            <Item  item={{...item.node, ...{category: { name: category}}}} key={item.node.id}></Item>
        );
      });
    }
  };

  
  

  const getUnique = (property) => {
    return new Set(
      tempArray.map((item) => item.node[property].name)
    );
  };

  let brands = getUnique("brand");

  let AllBrands = ["All", ...brands].map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  const updatePrice = (array) => {
    let prices = array.map((item) => item.node.price);
    setMinPrice(Math.min(...prices));
    setMaxPrice(Math.max(...prices));
  };

  // handle change for "select brand filter"
  const handleChange = (e) => {
    let temp =  [...tempArray];
    if (e.target.name === "brand") {
      setBrand(e.target.value);
      if (e.target.value !== "All") {
        temp = temp.filter((item) => item.node.brand.name === e.target.value);
        setArray(temp);
        updatePrice(temp);
      } else {
        updatePrice(temp);
        setArray(temp);
      }
    } else if (e.target.name === "price") {
      setPrice(Number(e.target.value));
      if (brand !== "All") {
        temp = temp.filter(
          (item) => item.node.price <= Number(e.target.value) && item.node.brand.name === brand
        );
        setArray(temp);
      } else {
        temp = temp.filter((item) => item.node.price <= Number(e.target.value));
        setArray(temp);
      }
    }
  };

  const getAds = () => {
    if (l.pathname === "/smartphones") {
      return phone;
    } else if (l.pathname === "/watchesandaccessories") {
      return watch;
    } else if (l.pathname === "/electronics") {
      return electronics;
    } else {
      return tv;
    }
  };

  const getHeader = (i) => {
    if (i === "smartphones") {
      return "Smart phones";
    } else if (i === "watchesandaccessories") {
      return "Watches and Accessories";
    } else if (i === "smarttv") {
      return "Smart TV";
    } else if (i === "electronics") {
      return "Electronics";
    } else if (i === "deals") {
      return "Deals";
    } else {
      return "Best Seller";
    }
  };

  
  const more = () => {
    if( data.itemsConnection.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          cursor: data.itemsConnection.pageInfo.endCursor
        }
      })
    }

  }

  const noItemStyle = {
    "color": "rgba(0,0,0,0.8)"
  }

  const MoreButton = data.itemsConnection.pageInfo?.hasNextPage? (
    <Button onClick={more}>More Items</Button>
  ) : (
    <p style={noItemStyle}>No more items..</p>
  )
  
  return (
    <>
      <ItemsContainer open={openNav}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{getHeader(category)} | telemartmyanmar</title>
          <meta
            name="descriptions"
            content="The biggest and most reliable mobile phones, watches, smart tv, electronics devices distribution company in Myanmar"
          />
          <link rel="canonical" href="http://www.telemartmyanmar.com" />
        </Helmet>
        <Ads src={getAds()}></Ads>
        <div className="container">
          {/* <h3 className="title">{data  && getHeader(items)}</h3> */}
          <Filter>
            <form className="form">
              <select
                name="brand"
                value={brand}
                onChange={(e) => handleChange(e)}
              >
                {AllBrands}
              </select>
              <div className="range">
                <input
                  type="range"
                  name="price"
                  min={`${minPrice}`}
                  max={`${maxPrice}`}
                  value={`${price}`}
                  onChange={(e) => handleChange(e)}
                />{" "}
                <span>{currencyFormatter(price)} Kyats</span>
              </div>
            </form>
          </Filter>
          {array && array.length > 0 ? (
            <div className="itemList">{allItems()}</div>
          ) : (
            <Error>No items...</Error>
          )}
        </div>
        <BtnWrapper>
          { data.itemsConnection.edges.length >= 4 && MoreButton }
        </BtnWrapper>
      </ItemsContainer>
      {/* <div
        style={{ width: "100%", height: "100px", backgroundColor: "white" }}
      ></div> */}
    </>
  );
}

const BtnWrapper = styled.div`
  width: 100vw;
  padding: 30px 0px 150px 0px;
  display: grid;
  justify-items: center;
`;

const Button = styled.button`
  border: none;
  width: 150px;
  padding: 10px;
  background-color: ${color.lightBlue};
  color: white;
  font-size: 1.2em;
  box-shadow: 0px 5px 10px rgba(0,0,0,0.8);
`;

const Ads = styled.img`
  width: 100%;
  object-fit: contain;
`;

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
  min-height: 80vh;
  height: max-content;
  background-color: white;

  ${(props) =>
    props.open &&
    css`
      min-height: 90vh;
      overflow-y: hidden;
    `}

  .container {
    width: 90vw;
    margin: auto;
    padding-top: 20px;

    @media only screen and (max-width: 500px) {
      width: 100vw;
    }
  }

  .title {
    display: inline-block;
    position: relative;
    margin: 30px 0px;

    ::after {
      content: "";
      position: absolute;
      bottom: -7px;
      left: 0;
      right: 0;
      height: 3px;
      width: 100%;
      background-color: ${color.lightBlue};
      transition: all 0.5s ease-in-out;
    }

    :hover::after {
      width: 100%;
    }

    @media only screen and (max-width: 500px) {
      margin: 15px;
      font-size: 16px;
    }
  }

  .itemList {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 230px));
    justify-items: center;
    gap: 10px;

    @media only screen and (max-width: 500px) {
      grid-template-columns: repeat(auto-fit, minmax(160px, 172px));
      gap: 0px;
      margin: 0 15px;
    }
  }
`;

const Filter = styled.div`
  width: 630px;
  font-size: 14px;
  margin-top: 50px;
  margin-bottom: 20px;

  .form {
    width: 100%;
    display: flex;
    align-items: center;

    select {
      width: 300px;
      font-size: 100%;
      margin-right: 30px;
      padding: 5px 10px;

      &:focus {
        min-width: 300px;
        width: auto;
      }

      option {
        font-size: 100%;
      }
    }

    .range {
      width: 100%;
      flex: 1;
      margin: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      input[type="range"] {
        width: 60%;
        color: ${color.lightBlue};
      }

      span {
        width: 100px;
        margin-left: 15px;
      }
    }

    @media only screen and (max-width: 500px) {
      input {
        margin-top: 10px;
        width: 100%;
        height: 30px;
        cursor: pointer;
        margin: 0px !important;
      }

      select {
        margin-left: 0px !important;
      }
    }
  }

  @media only screen and (max-width: 500px) {
    margin: 15px 0px 20px 15px;
    width: 330px;

    .form {
      flex-direction: column;

      select {
        margin-bottom: 10px;
        margin-left: 15px;
      }

      .range {
        span {
          margin-left: 0px;
        }
      }
    }
  }
`;

const Error = styled.div`
  @media only screen and (max-width: 500px) {
    margin-left: 25px;
  }
`;

export default Items;
