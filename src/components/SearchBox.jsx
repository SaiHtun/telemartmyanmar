import React, { useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import { color } from "../constants/variables";
import { useHistory, useLocation } from "react-router-dom";
//  context api
import { ItemsContext } from "../context/ItemsContext";
import { NavContext } from "../context/NavContext";
//  utility functions
import { stringCutter } from "../utility/functions";
// icons
import { FaSearch } from "react-icons/fa";



export default function SearchBox({ show }) {
  const [filtered, setFiltered] = useState([]);
  const [ select, setSelect ] = useState("all");

  const [search, setSearch] = useState("");
  const { data, showSearch, setShowSearch } = useContext(ItemsContext);
  const { setOpenNav } = useContext(NavContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/" && setSelect("all")
  }, [location])


  const handleClick = (item) => {
    history.push(`/${item.category}/${item.id}`);
    setOpenNav(false);
    setShowSearch(false);
  };

  const handleRoute = (e) => {
    setSelect(e);
    if(e === "all") return history.push("/");
    history.push(`/${e}`);
  }

  const handleChange = (value) => {
    setShowSearch(true);
    let array = data.allItems.items.filter((item) =>
      item.descriptions.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(array);
  };

  let searchItems =
    filtered.length &&
    filtered.map((item, i) => {
      return (
        <div className="item" key={i} onClick={() => handleClick(item)}>
          {show
            ? stringCutter(item.descriptions, 25)
            : stringCutter(item.descriptions, 50)}
        </div>
      );
    });

  return (
    <Container show={show}>
      <Search className="search">
        <Selector  value={select} onChange={(e) => handleRoute(e.target.value)}>
          <option value="all">All</option>
          <option value="smartphones">Smart Phones</option>
          <option value="watchesandaccessories">Watches and Accessories</option>
          <option value="smarttv">Smart TV</option>
          <option value="electronics">Electronics</option>
        </Selector>
        <form className="form">
          <input
            className="input"
            value={search}
            type="text"
            placeholder="Search here"
            onChange={(e) => {
              setSearch(e.target.value);
              handleChange(e.target.value);
            }}
            onFocus={(e) => handleChange(e.target.value)}
          ></input>
          <FaSearch className="searchIcon" />
        </form>
      </Search>
      {/* search box */}
      {showSearch && search ? (
        <div className="searchList">{searchItems ? searchItems : null}</div>
      ) : null}
    </Container>
  );
}

const Search = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  justify-content: space-between;
   align-items: center; 
`;

const Container = styled.div`
  width: 400px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .form {
    width: 100%;
    height: 36px;
    font-size: 13px;
    position: relative;

    @media only screen and (max-width: 820px) {
       height: 60px;
     }
    .input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 36px;
      padding: 8px 15px;
      font-size: 100%;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border: none;
      outline: none;
      /* outline-color: ${color.lightBlue};
      outline-offset: -2px; */

    

     @media only screen and (max-width: 820px) {
       border-top-left-radius: 5px;
       border: 1px solid #d4d4d4;
       border-radius: 5px;
     }
    }
  }

  .searchIcon {
    position: absolute;
    top: 12px;
    right: 15px;
    color: ${color.darkBlue};
    cursor: pointer;
  }

  .searchList {
    position: absolute;
    top: 38px;
    background-color: white;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 100%;
    height: max-content;
    font-size: 13px;
    color: grey;
    z-index: 100;
    overflow: hidden;

    .item {
      height: 40px;
      line-height: 40px;
      padding-left: 30px;
      border-bottom: 1px solid #d6d6d6;
      cursor: pointer;
      z-index: 100;
      font-weight: 400;

      &:hover {
        background-color: ${color.lightBlue};
        color: white;
      }
    }

    @media only screen and (max-width: 820px) {
      top: 35px;
    }
  }

  @media only screen and (max-width: 1100px) {
    display: none;
    width: 300px;
  }

  ${(props) =>
    props.show &&
    css`
      .form {
        height: 36px;

        .searchIcon {
          top: 10px;
        }
      }

      @media only screen and (max-width: 1000px) {
        display: block;
      }
      @media only screen and (max-width: 500px) {
        width: 230px;
      }
    `}
`;

const Selector = styled.select`
  width: 60px;
  height: 36px;
  text-align: center;
  background-color: ${color.lightBlue};
  z-index: 1;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: white;
  outline: 0px;
  padding-left: 5px;
  @media only screen and (max-width: 1100px) {
        display: none;
  }

`;

