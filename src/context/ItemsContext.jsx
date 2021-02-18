import React, { createContext, useState } from "react";
import styled from 'styled-components';
import { ReactComponent as Loading } from '../assets/loading.svg';
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../queries/query";

export const ItemsContext = createContext();

const ItemsContextProvider = (props) => {
  let [showSearch, setShowSearch] = useState(false);

  // const { loading, error, data } = useQuery(GET_ITEMS);

  // if (loading) return (
  //     <LoadingWrapper>
  //       <Loading style={{ width: "50px", height: "50px", marginTop: "200px"}}></Loading>
  //     </LoadingWrapper>
  // );
  // if (error) return;

  return (
    <ItemsContext.Provider value={{  showSearch, setShowSearch }}>
      {props.children}
    </ItemsContext.Provider>
  );
};

// const LoadingWrapper = styled.div`
//   width: 100vw;
//   height: 100vh;
//   z-index: 1000;
//   display: flex;
//   background-color: white;
//   justify-content: center;
//   align-items: flex-start;
// `;

export default ItemsContextProvider;
