import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  GET_SPECIFIC_ITEMS,
  GET_DISCOUNT_ITEMS,
  GET_BESTSELLERS_ITEMS,
} from "../queries/query";
import { NavContext } from "../context/NavContext";

//  variables
import { color } from "../constants/variables";
// components
import Item from "../components/Item";
import Footer from "../components/Footer";
import { ReactComponent as Loading } from '../assets/loading.svg';
// utility functions
import { currencyFormatter } from "../utility/functions";

function Items() {
  const [array, setArray] = useState([]);
  const [brand, setBrand] = useState("all");
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const { openNav } = useContext(NavContext);
  const { items } = useParams();

  // const abortController = new AbortController();
  let whatToQuery = () => {
    if (items !== "deals" && items !== "bestsellers") {
      return GET_SPECIFIC_ITEMS;
    } else if (items === "deals") {
      return GET_DISCOUNT_ITEMS;
    } else if (items === "bestsellers") {
      return GET_BESTSELLERS_ITEMS;
    }
  };

  let whatVariable = () => {
    if (items !== "deals" && items !== "bestseller") {
      return { variables: { items: items } };
    }
    return;
  };

  const { loading, error, data } = useQuery(whatToQuery(), whatVariable());

  useEffect(() => {
    setArray(data?.itemsCollection.items);
    let priceArray = data?.itemsCollection?.items.map((item) => item.price);
    let defaultPrice = data ? Math.max(...priceArray) : null;
    let minPrice = data ? Math.min(...priceArray) : null;
    defaultPrice && setPrice(defaultPrice);
    defaultPrice && setMaxPrice(defaultPrice);
    minPrice && setMinPrice(minPrice);
  }, [data]);

  if (error) return <div>{error.message}</div>;

  const allItems = () => {
    if (loading) {
      return (
        <LoadingWrapper>
          <Loading style={{ width: "50px", height: "50px", marginTop: "200px" }}></Loading>
        </LoadingWrapper>
      )
    } else if (error) {
      console.error(error.message);
    } else {
      return (
        array.length > 0 &&
        array.map((item) => {
          return <Item key={item.id} item={item}></Item>;
        })
      );
    }
  };

  const getUnique = (property) => {
    return new Set(data?.itemsCollection.items.map((item) => item[property]));
  };

  let brands = getUnique("brand");

  let AllBrands = ["all", ...brands].map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  // handle change for "select brand filter"
  const handleChange = (e) => {
    let temp = [...data?.itemsCollection.items];
    if (e.target.name === "brand") {
      setBrand(e.target.value);
      if (e.target.value !== "all") {
        temp = temp.filter((item) => item.brand === e.target.value);
        setArray(temp);
        return;
      }
      setArray(temp);
    } else if (e.target.name === "price") {
      setPrice(Number(e.target.value));

      if (Number(e.target.value) !== price) {
        if (brand !== "all") {
          temp = temp.filter(
            (item) => item.price <= e.target.value && item.brand === brand
          );
          setArray(temp);
        } else {
          temp = temp.filter((item) => item.price <= e.target.value);
        }
      }
      setArray(temp);
    }
  };

  return (
    <>
      <ItemsContainer open={openNav}>
        <div className="ads"></div>
        <div className="container">
          <h3 className="title">{array && getHeader(items)}</h3>
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
      </ItemsContainer>
      <div
        style={{ width: "100%", height: "100px", backgroundColor: "white" }}
      ></div>
      <Footer></Footer>
    </>
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
    width: 80vw;
    margin: auto;

    @media only screen and (max-width: 500px) {
      width: 100vw;
    }
  }

  .ads {
    width: 100%;
    height: 300px;
    background-color: salmon;
    position: relative;
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
    /* margin: 0px 15px; */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 250px));
    justify-items: center;

    @media only screen and (max-width: 500px) {
      grid-template-columns: repeat(auto-fit, minmax(170px, 172px));
      margin: 0 15px;
    }
  }
`;

const Filter = styled.div`
  width: 630px;
  font-size: 14px;
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
      justify-content: space-around;
      align-items: center;

      input[type="range"] {
        width: 60%;
      }

      span {
        width: 100px;
        margin-left: 15px;
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

const Error = styled.div`
  @media only screen and (max-width: 500px) {
    margin-left: 25px;
  }
`;

export default Items;
