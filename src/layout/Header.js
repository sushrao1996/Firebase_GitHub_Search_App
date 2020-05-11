import React, { useState, useContext } from "react";
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const context = useContext(UserContext);
  return (
    <Navbar light expand="md" className="bg-info p-2">
      <NavbarBrand>
        <Link to="/" className="text-light">
          LCO Gitfire App
        </Link>
      </NavbarBrand>
      <NavbarText className="text-white">
        {context.user?.email ? "Welcome " + context.user.email : ""}
      </NavbarText>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {context.user ? (
            <>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/"
                  onClick={() => context.setUser(null)}
                  className="text-white"
                >
                  Logout
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink tag={Link} to="/signin" className="text-white">
                  SignIn
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/signup" className="text-white">
                  SignUp
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
