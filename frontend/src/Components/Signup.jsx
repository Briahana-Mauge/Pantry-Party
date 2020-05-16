import React from "react";
// import Axios from "axios";
import { Redirect, Link } from "react-router-dom";

const Signup = ({
  username,
  password,
  email,
  firstname,
  lastname,
  isLoggedIn,
  signupUser,
  setUsername,
  setPassword,
  setEmail,
  setFirstname,
  setLastname,
  setLoggedIn,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser();
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <form className="col s12" onSubmit={handleSubmit}>
            <h2 className="center-align">Sign-Up</h2>
            <div className="row">
              <div className="input-field col s6">
                <input
                  type="text"
                  value={username}
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-field col s6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="validate"
                  required
                  placeholder="password"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s8 offset-s2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="validate"
                  required
                  placeholder="email"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  placeholder="first name"
                />
              </div>
              <div className="input-field col s6">
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="validate"
                  required
                  placeholder="last name"
                />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="submit" name="action">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link className="buttonlink" to="/" style={{ color: "white" }}>
            <button style={{ marginTop: "50px" }} type="button" name="action">
              Already have an account?
              <br />
              Log In here.
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
