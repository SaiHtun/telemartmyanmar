import React from "react";
import styled from "styled-components";
import { color } from "../constants/variables";
// icons
import { FaFacebookSquare, FaInstagram, FaGlobeAfrica } from "react-icons/fa";

export default function Footer() {
  return (
    <FooterContainer>
      <h3 className="footerTitleOne">
        <span>Telemartmyanmar</span> is the subsidiaries of{" "}
        <span>SPS Business Group</span>{" "}
      </h3>
      <div className="footerInfo">
        <Message>
          <h3>Dear valued customers,</h3>
          <p>
            We are so exicited to launch our brand new 1.0.0 version of the
            website, purposely to enhance the accessibility of our availble
            items and services for our business partners and customers,
            regrettably you won't be able place an order or checkout directly
            through our website yet due to the requirements of our company's
            infastructure, but we are promised and aiming to deliver the
            features near in the future. In the meantime please contact us
            through via PHONE, MESSENGER or visit our retail store.
          </p>
        </Message>
        <Location>
          <Store>
            No.130, 7th floor, 24rd street,
           Upper Block, Latha Township,
            Yangon, Myanmar.
          </Store>
          <Contact>
            <Social>
              <FaFacebookSquare className="fb" /> <FaInstagram className="in" />
              <FaGlobeAfrica className="web" />
            </Social>
            <p> +415 345 9879</p>
          </Contact>
        </Location>
      </div>
      <h3 className="footerTitleTwo">
        <span> © 2020, Telemartmyanmar </span>
        <span>Powered by VoilaSoft</span>{" "}
      </h3>
    </FooterContainer>
  );
}

// ###################################### Footer ######################################
const FooterContainer = styled.div`
  width: 100%;
  min-height: 500px;
  height: max-content;
  background: ${color.darkBlue};
  color: white;
  position: relative;

  @media only screen and (max-width: 500px) {
    font-size: 14px;
  }

  h3 {
    width: 100%;
    padding: 15px 0;
    text-align: center;
    font-size: 13px;
    line-height: 15px;
    font-weight: 300;

    span {
      font-weight: 500;
    }
  }

  .footerInfo {
    width: 100%;
    min-height: 400px;
    height: max-content;
    padding: 20px;
  }

  .footerTitleOne {
    background-color: ${color.lightBlue};
    border-bottom: 1px solid #515151;
  }

  .footerTitleTwo {
    position: absolute;
    font-style: italic;
    line-height: 15px;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid ${color.lightBlue};
    span {
      font-size: 12px;
      font-weight: bold !important;
    }
  }
`;

const Message = styled.div`
  padding: 20px;

  h3 {
    text-align: left;
    font-size: 1.2em;
    font-weight: 400;
  }

  p {
    line-height: 130%;
    color: rgba(255, 255, 255, 0.6);
    font-size: 15px;
    text-indent: 30px;
  }
`;

const Location = styled.div`
  width: 100%;
  min-height: 150px;
  margin-top: 20px;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 600px) {
    margin: 10px 0px;
  }
  @media only screen and (max-width: 400px) {
    font-size: 14px;
    margin: 20px 0px;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 5px;
`;

const Social = styled.div`
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    gap: 10px;

   .fb {
        color: #3b5998;
      }
      .in {
        color: #8a3ab9;
      }
      .web {
        color: grey;
      }
`;



const Store = styled.p`
  padding: 20px;
  text-align: center;
`;


