import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const { REACT_APP_ATOKEN: ATOKEN } = process.env;


const client = new ApolloClient({
  uri: `https://api-ap-northeast-1.graphcms.com/v2/${ATOKEN}/master?query=query%20%7B%0A%09homes%20%7B%0A%20%20%20%20slidingImages%20%7B%0A%20%20%20%20%20%20url%0A%20%20%20%20%7D%0A%20%20%20%20adsImage%20%7B%0A%20%20%20%20%20%20url%0A%20%20%20%20%7D%0A%20%20%20%20heroMobileImage%20%7B%0A%20%20%20%20%20%20url%0A%20%20%20%20%7D%0A%20%20%7D%0A%09%0A%20%09discounts(where%3A%20%7B%20items_some%3A%20%7Bdiscount%3A%20%7B%20value_gt%3A%200%7D%7D%7D)%7B%0A%20%20%20%20items(where%3A%20%7B%20discount%3A%20%7B%20value_gt%3A%200%7D%7D)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20discount%20%7B%0A%20%20%20%20%20%20%20%20value%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%7D%0A%20%20%0A%20%20bestsellers%20%7B%0A%20%20%20%20items(first%3A%204)%20%7B%0A%20%20%20%20%20%20images(first%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%0A%20%20smartphones%3A%20category%20(where%3A%20%7B%20name%3A%20%22smartphones%22%7D)%7B%0A%20%20%20%20items(first%3A%205)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20images(first%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%0A%20%20watchesandaccessories%3A%20category%20(where%3A%20%7B%20name%3A%20%22watchesandaccessories%22%7D)%7B%0A%20%20%20%20items(first%3A%205%2C%20where%3A%20%7B%20discount%3A%20%7B%20value_gt%3A%200%7D%7D)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20images(first%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20price%0A%20%20%20%20%20%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%0A%20%20electronics%3A%20category%20(where%3A%20%7B%20name%3A%20%22electronics%22%7D)%7B%0A%20%20%20%20items(first%3A%205)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20images(first%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20price%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%0A%20%20smarttv%3A%20category%20(where%3A%20%7B%20name%3A%20%22smarttv%22%7D)%7B%0A%20%20%20%20items(first%3A%205)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20images(first%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20price%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          itemsConnection: relayStylePagination()
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only"
    }
  }
})



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
