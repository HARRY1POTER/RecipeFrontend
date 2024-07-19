import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Nav.css";
import Home from "./Home";
import Explore from "./Explore";
import Add from "./Add";
import Save from "./Save";
import SignIn from "./SignIn";
import AuthRoute from "../AuthRoute";
import LogIn from "./LogIn";
import Full from "./Full";
import Profile from "./Profile";
import EditRecipe from "./EditRecipe";
import SaveRecipe from "./Save-Recipe";

function Dropdown({ username, logout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <p className="dropdown-btn" onClick={toggleDropdown}>
        {username}
        <span className="dropdown-icon">&#9660;</span>
      </p>
      {isOpen && (
        <div className="dropdown-content">
          <Link to="/Profile" className="dropdown-item" onClick={closeDropdown}>
            My Profile
          </Link>
          <div className="dropdown-divider"></div>
          <p className="dropdown-item" onClick={logout}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

function Navigation() {
  const location = useLocation();
  const auth = localStorage.getItem("user");
  const Logout = () => {
    localStorage.clear();
    window.location.reload("/");
  };

  const showNavbar = () => {
    return !["/signin", "/LogIn", "/SignIn"].includes(location.pathname);
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      const userData = JSON.parse(auth);
      if (userData && userData.data && userData.data.name) {
        setUsername(userData.data.name);
      }
    }
  }, []);

  return (
    <>
      {showNavbar() && (
        <div>
          <Navbar
            className="v border-bottom border-warning "
            collapseOnSelect
            expand="lg"
            bg=""
            variant="dark"
          >
            <Container className="v" style={{ display: "contents" }}>
              <LinkContainer to="/">
                <Navbar.Brand className="h1  px-5">
                  <label className="text-dark  caveat-font">Recipe</label>
                  <label className=" caveat-font">Hub</label>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                style={{ background: "orange" }}
              />

              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto h2 gap-5 mx-auto">
                  <LinkContainer to="/Home">
                    <Nav.Link className="text-warning">Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/Explore">
                    <Nav.Link className="text-warning">Explore</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/Add">
                    <Nav.Link className="text-warning">Add</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/Save">
                    <Nav.Link className="text-warning">Save</Nav.Link>
                  </LinkContainer>
                </Nav>

                <Nav className="pr-5">
                  {auth ? (
                    <Dropdown username={username} logout={Logout} />
                  ) : (
                    <LinkContainer to="/SignIn">
                      <Nav.Link
                        className="btn btn-warn btn-lg font-weight-bold text-white"
                        style={{ color: "orange", fontSize: "large" }}
                      >
                        Sign In
                      </Nav.Link>
                    </LinkContainer>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route element={<AuthRoute />}>
          <Route path="/Explore" element={<Explore />} />
          <Route path="/Add" element={<Add />} />
          <Route path="/Save" element={<Save />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/EditRecipe" element={<EditRecipe />} />
        </Route>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Full" element={<Full />} />
        <Route path="/Full/:title" element={<Full />} />;
        <Route path="/Save-Recipe/:title" element={<SaveRecipe />} />;
      </Routes>
    </>
  );
}

export default Navigation;
