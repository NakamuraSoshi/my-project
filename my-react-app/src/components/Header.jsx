import React from "react";
import SidebarButton from "./SidebarButton";

const Header = ({ title }) => {
  return (
    <header className="heander">
      <h1>{title}</h1>
      <SidebarButton />
    </header>
  );
};

export default Header;