import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();
  const showfooter = () => {
    return !["/signin", "/LogIn", "/SignIn"].includes(location.pathname);
  };
  return (
    <>
      {showfooter() && (
        <div className="b">
          <div className="footer-basic">
            <footer>
              <div className="social">
                <Link to="/">
                  <i className="icon ion-social-instagram"></i>
                </Link>
                <Link to="/">
                  <i className="icon ion-social-snapchat"></i>
                </Link>
                <Link to="/">
                  <i className="icon ion-social-twitter"></i>
                </Link>
                <Link to="/">
                  <i className="icon ion-social-facebook"></i>
                </Link>
              </div>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">Services</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">About</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">Terms</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">Privacy Policy</Link>
                </li>
              </ul>
              <p className="copyright">Company Name © 2024</p>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
