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

import NavContextProvider from "./context/NavContext.jsx";
import ItemsContextProvider from "./context/ItemsContext";
import ScrollTop from "./components/ScrollTop";
import Footer from "./components/Footer.jsx";
import Services from './pages/Services';

function App() {
  return (
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
                <Route  path="/services">
                  <Services></Services>
                </Route>
                <Route path="/:category/:itemId">
                  <Item></Item>
                </Route>
                <Route path="/:category">
                  <Items></Items>
                </Route>
               
                <Route path="*">
                  <Error />
                </Route>
              </Switch>
              <Footer></Footer>
            </Root>
          </div>
        </NavContextProvider>
      </ItemsContextProvider>
  );
}

export default App;
