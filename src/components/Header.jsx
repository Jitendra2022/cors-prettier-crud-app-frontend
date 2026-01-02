import React from "react";
import StickyHeader from "./StickyHeader ";
// import Navbar from "./Navbar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <div className="sticky top-0">
        <StickyHeader />
      </div>

      <Navbar />
    </>
  );
};

export default Header;
