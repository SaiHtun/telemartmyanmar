import React from "react";
import styled from "styled-components";
import { GET_SERVICE } from '../queries/query';
import { useQuery } from '@apollo/client'

export default function Services() {
  const { loading, error, data } = useQuery(GET_SERVICE)

  if(loading) return <Loading>Loading..</Loading>
  if(error) return 

  const { title, intro, messages } = data.services[0]

  return (
    <Container>
      <Title>
        {title}
      </Title>
      <Wrapper>
        <Intro>
            {intro}
        </Intro>
        <Follow>
          {messages.map((m) => (
            <p>
              {m}
            </p>
          ))}
        </Follow>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 80vw;
  margin: auto;
  padding: 100px 0px;
  min-height: 100vh;
  height: max-content;
  @media only screen and (max-width: 600px) {
      width: 90vw;
      padding: 80px 0px;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: bold;

  @media only screen and (max-width: 600px) {
     font-size: 20px;
  }
`;

const Loading = styled.div`
  min-height: 100vh;
  min-width: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Intro = styled.p`
  text-align: center;
  color: rgba(0,0,0,0.6)
`;

const Follow = styled.div`
    margin-top: 50px;
    p {
        margin-bottom: 15px;
    }
`;

const Wrapper = styled.div`
    font-size: 15px;

 @media only screen and (max-width: 600px) {
     font-size: 14px;
  }
`;
