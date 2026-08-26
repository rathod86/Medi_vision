import React from "react";
import "./Footer.css";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-left">
        <p>
          © {currentYear} <strong>Medi Vision</strong>. All Rights Reserved.
        </p>
      </div>

      <div className="footer-right">
        <p>
          Developed with <FaHeart className="heart-icon" /> using React & Spring
          Boot
        </p>
      </div>
    </footer>
  );
};

export default Footer;