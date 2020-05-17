import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ logoutUser, isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <>
        <nav className="NavBar">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo left" style={{fontSize:'15px'}}>
              Pantry Party
            </a>
            <ul className="right">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <button onClick={logoutUser}>Log-out</button>
            </ul>
          </div>
        </nav>
      </>
    );
  }
  return (
    <nav className="NavBar">
      <a href="#!" className="brand-logo left">
        Pantry Party
      </a>
      <ul className="right">
        <li>
          <Link to="/">Log In</Link>
        </li>

        <li>
          <Link to="/signup">Sign Up</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
