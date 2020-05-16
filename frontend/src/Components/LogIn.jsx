import React from "react";
import { Link, Redirect } from "react-router-dom";

const Landing = ({
  username,
  password,
  setUsername,
  setPassword,
  isLoggedIn,
  setLoggedIn,
  loginUser,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <div>
        <div className="row left">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-feild col s5">
                <input
                  className="validate"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-feild col s5">
                <input
                  className="validate"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            
              <div>
                <button style={{marginLeft:'25%' }} type="submit" name="action">
                  Log-In
                </button>
                <Link to="/signup">
                  <button>Sign-Up</button>
                </Link>
              </div>
              </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Landing;
