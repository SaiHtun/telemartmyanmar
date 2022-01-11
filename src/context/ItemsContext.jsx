import React, { createContext, useState } from "react";
import { gql } from '@apollo/client';
import { useQuery } from "@apollo/client";

export const ItemsContext = createContext();

const ItemsContextProvider = (props) => {
  let [showSearch, setShowSearch] = useState(false);

  const { loading, error, data } = useQuery(gql`
    query {
      homes {
        slidingImages {
          url
        }
      }
    }
  `);

  return (
    <ItemsContext.Provider value={{  showSearch, setShowSearch, heroImages: data }}>
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsContextProvider;
