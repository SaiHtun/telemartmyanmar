import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
const { REACT_APP_ATOKEN: ATOKEN } = process.env;

const client = new ApolloClient({
  uri: `https://api-ap-northeast-1.graphcms.com/v2/${ATOKEN}/master`,
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
