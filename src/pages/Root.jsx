import React, { useContext } from "react";
import { ItemsContext } from "../context/ItemsContext";

function Root(props) {
  const { setShowSearch } = useContext(ItemsContext);

  const handleClick = (e) => {
    if (
      e.target.className !== "searchList" &&
      e.target.className !== "item" &&
      e.target.className !== "form" &&
      e.target.className !== "input"
    ) {
      setShowSearch(false);
    }
  };

  return <div onClick={(e) => handleClick(e)}>{props.children}</div>;
}

export default Root;
