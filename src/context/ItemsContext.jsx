import React, { createContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SEARCH_ITEMS } from "../queries/query";

export const ItemsContext = createContext();

const ItemsContextProvider = (props) => {
  let [showSearch, setShowSearch] = useState(false);

  const { loading, error, data } = useQuery(GET_SEARCH_ITEMS);

  if (loading) return <div>It's loading</div>;
  if (error) return;

  return (
    <ItemsContext.Provider value={{ data, showSearch, setShowSearch }}>
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsContextProvider;
