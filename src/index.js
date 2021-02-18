import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";


const { REACT_APP_SPACEID: SPACEID, REACT_APP_ATOKEN: ATOKEN } = process.env;


const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${SPACEID}?access_token=${ATOKEN}`,
  cache: new InMemoryCache()
})

console.log(client)

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
