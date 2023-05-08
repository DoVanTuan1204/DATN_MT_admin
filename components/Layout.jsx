import React from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div className="bg-blue-900 min-h-screen flex flex-row">
      <Nav />
      <div className="bg-white flex-grow m-2 p-4 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Layout;
