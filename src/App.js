import Navbar from "./components/Navbar.jsx";
import { Switch, Route } from "react-router-dom";
// Routes
import Home from "./pages/Home";
import Items from "./pages/Items";
import Item from "./pages/Item";
import Error from "./pages/Error";
import Root from "./pages/Root";
// components
import Menu from "./components/Menu";
import Overlay from "./components/Overlay";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import NavContextProvider from "./context/NavContext.jsx";
import ItemsContextProvider from "./context/ItemsContext";
import ScrollTop from "./components/ScrollTop";

const { REACT_APP_SPACEID: SPACEID, REACT_APP_ATOKEN: ATOKEN } = process.env;

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${SPACEID}?access_token=${ATOKEN}`,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ItemsContextProvider>
        <NavContextProvider>
          <div className="App">
            <Root>
              <Overlay />
              <Navbar />
              <Menu />
              <ScrollTop />
              <Switch>
                <Route exact path="/">
                  <Home></Home>
                </Route>
                <Route path="/:category/:itemId">
                  <Item></Item>
                </Route>
                <Route path="/:items">
                  <Items></Items>
                </Route>
                <Route path="*">
                  <Error />
                </Route>
              </Switch>
            </Root>
          </div>
        </NavContextProvider>
      </ItemsContextProvider>
    </ApolloProvider>
  );
}

export default App;
