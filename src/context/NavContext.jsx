import React, { createContext, useState } from "react";

export const NavContext = createContext();

function NavContextProvider(props) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <NavContext.Provider value={{ openNav, setOpenNav }}>
      {props.children}
    </NavContext.Provider>
  );
}

export default NavContextProvider;
