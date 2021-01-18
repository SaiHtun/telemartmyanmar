import React from "react";
import styled from "styled-components";
import { stringCutter } from "../utility/functions";
import { useHistory } from "react-router-dom";
//  variables
import { color, fontSize } from "../constants/variables";
// import functions
import { currencyFormatter } from "../utility/functions";

const StyledItem = styled.div`
  min-width: 170px !important;
  max-width: 280px;
  height: 400px;
  margin: 0px 5px;
  cursor: pointer;

  @media only screen and (max-width: 800px) {
    margin: 0px 20px;
  }
  @media only screen and (max-width: 500px) {
    margin: 0px 10px;
  }

  .rowTitle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      position: relative;

      ::after {
        position: absolute;
        content: "";
        height: 3px;
        bottom: -6px;
        margin: 0;
        left: 0;
        right: 0;
        width: 50%;
        background: ${color.lightBlue};
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
    z-index: 2;
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
      transform: scale(1.06);
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
  }

  .itemInfo {
    padding: 5px;
    line-height: 20px;
    z-index: 10;
    margin-top: 5px;
    min-width: 170px;
    min-height: 100px;
    max-height: 110px;

    .itemTitle {
      font-weight: 500;
      width: 100%;
    }

    .itemDes {
      width: 100%;
      font-size: ${fontSize.desText};
      color: #676767;
    }

    .itemDiscount {
      text-decoration: line-through;
      color: grey;
    }
  }
`;

function Item({ item }) {
  const history = useHistory();

  return (
    <StyledItem
      className="rowItem"
      onClick={() => history.push(`/${item.category}/${item.id}`)}
    >
      {item.discount ? (
        <div className="discountItem">-{item.discount}%</div>
      ) : null}
      <div className="imgContainer">
        <img src={item.imagesCollection.items[0].url} alt={item.name} />
      </div>
      <div className="itemInfo">
        <p className="itemTitle">{item.name}</p>
        <p className="itemDes">{stringCutter(item.descriptions, 60)}</p>
        {item.discount ? (
          <p>
            <small className="itemDiscount">
              {currencyFormatter(item.price)}
            </small>{" "}
            <small>
              {currencyFormatter(
                Math.floor(item.price - item.price * (item.discount / 100))
              )}{" "}
              Kyats
            </small>
          </p>
        ) : (
          <small>{currencyFormatter(item.price)} Kyats</small>
        )}
      </div>
    </StyledItem>
  );
}

export default Item;
