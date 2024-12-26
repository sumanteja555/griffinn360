// bootstrap imports for navbar
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "./AdminNavbar.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { snackbarActions, adminActions } from "../../../store/store";

function AdminNavbar() {
  const [expanded, setExpanded] = useState(false);

  const isAdminLoggedIn = useSelector((state) => state.admin.isAdminLoggedIn);
  const rawAdminId = useSelector((state) => state.admin.adminId);

  const adminId = rawAdminId ? rawAdminId.replace(/[0-9]/g, "") : null;
  const dispatch = useDispatch();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    setExpanded(false);
  };

  function handleLogout() {
    handleSelect();
    dispatch(adminActions.clearUser());
    dispatch(
      snackbarActions.openBar({
        type: "info",
        message: "Signout Successful",
      })
    );
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
        <Navbar.Brand to="/admin">
          <h1 className={styles.adminId}>{adminId}</h1>
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
              to="/admin/adminbookings"
              onClick={handleSelect}
            >
              Bookings
            </NavLink>
            <NavLink
              className="nav-link"
              role="button"
              tabIndex="0"
              to="/admin/adminvolunteers"
              onClick={handleSelect}
            >
              volunteers
            </NavLink>

            {isAdminLoggedIn ? (
              <NavLink to="/admin" className="nav-link" onClick={handleLogout}>
                Logout
              </NavLink>
            ) : (
              <NavLink
                className="nav-link"
                role="button"
                tabIndex="0"
                to="/admin"
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

export default AdminNavbar;
