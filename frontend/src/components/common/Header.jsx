import React from "react";
import "./Header.css";

const Header = ({ title, subtitle }) => {
  return (
    <div className="page-header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Header;