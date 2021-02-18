import React from "react";
import styled from "styled-components";
import { color } from "../constants/variables";
import { useQuery } from '@apollo/client';
import { GET_FOOTER } from '../queries/query';
// icons
import { FaFacebookSquare, FaInstagram, FaGlobeAfrica } from "react-icons/fa";

export default function Footer() {
  const { loading, error, data } = useQuery(GET_FOOTER);

  return (
    <FooterContainer>
      <h3 className="footerTitleOne">
        <span>Telemartmyanmar</span> is the subsidiaries of{" "}
        <span>Apex Lion Technology Co.,ltd</span>{" "}
      </h3>
      <div className="footerInfo">
        <Message>
          <h3>{data?.footerCollection.items[0].title}</h3>
          <p>
            {data?.footerCollection.items[0].messages}
          </p>
        </Message>
        <Location>
          <Contact>
            <Social>
              <FaFacebookSquare className="fb" /> <FaInstagram className="in" />
              <FaGlobeAfrica className="web" />
            </Social>
            <p>{data &&  data.footerCollection.items[0].hotlines.map((line, i) => {
              return (
                <small key={i}>{line}</small>
              )
            })}</p>
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
    margin-top: 80px;

    @media only screen and (max-width: 500px) {
      margin-top: 0px;
    }

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

  @media only screen and (max-width: 400px) {
    padding: 20px 0px;
  }


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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 5px;

  p {
    font-size: 14px;
    color: rgba(255,255,255,0.8)
    
  }

  small {
    font-size: 13px;
    margin-right: 10px;
  }

  @media only screen and (max-width: 400px) {
    gap: 10px;
  }
`;

const Social = styled.div`
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    gap: 10px;

    @media only screen and (max-width: 400px) {
      gap: 15px;
    }

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






