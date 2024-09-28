// bootstrap imports for navbar
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// logo import
import logo from "../../assets/logo.webp";

import styles from "./NavbarItem.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/store";

function NavbarItem() {
  const [expanded, setExpanded] = useState(false);


  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    setExpanded(false);
  };

  function handleLogout() {
    handleSelect();
    dispatch(userActions.clearUser())
  }
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={styles.navbar}
      sticky="top"
      variant="light"
      data-bs-theme="light"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand to="/">
          <img
            src={logo}
            width="100"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleToggle}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavLink
              className="nav-link"
              role="button"
              tabIndex="0"
              to="/"
              onClick={handleSelect}
            >
              Home
            </NavLink>
            <NavDropdown title="Activities" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <NavLink
                  to="/adventurepark"
                  className="dropdown-item"
                  onClick={handleSelect}
                >
                  Adventure Park
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink
                  to="/nightcamps"
                  className="dropdown-item"
                  onClick={handleSelect}
                >
                  Night Camps
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink
                  to="/mountaintreks"
                  className="dropdown-item"
                  onClick={handleSelect}
                >
                  Mountain Treks
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink
                  to="/weekendgateway"
                  className="dropdown-item"
                  onClick={handleSelect}
                >
                  Weekend Gateway
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink
              className="nav-link"
              role="button"
              tabIndex="0"
              to="/gallery"
              onClick={handleSelect}
            >
              Gallery
            </NavLink>
            <NavLink
              className="nav-link"
              role="button"
              tabIndex="0"
              to="/aboutus"
              onClick={handleSelect}
            >
              About Us
            </NavLink>
            <NavLink
              className="nav-link"
              role="button"
              tabIndex="0"
              to="/volunteer"
              onClick={handleSelect}
            >
              Volunteer
            </NavLink>


            {isLoggedIn ? (<NavDropdown title={userName} id="basic-nav-dropdown">
              <NavDropdown.Item>
                <NavLink
                  to="/bookings"
                  className="dropdown-item"
                  onClick={handleSelect}
                >
                  Bookings
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink
                  to="/"
                  className="dropdown-item"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>) : (
              <NavLink
                className="nav-link"
                role="button"
                tabIndex="0"
                to="/user"
                onClick={handleSelect}
              >
                Login
              </NavLink>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarItem;
