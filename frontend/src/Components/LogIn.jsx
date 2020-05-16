import React from "react";
import { Link, Redirect} from "react-router-dom";

const Landing =({username, password, setUsername, setPassword, isLoggedIn, setLoggedIn, loginUser}) => {

const handleSubmit = (e) =>{
  e.preventDefault()
  loginUser()
}

// if(isLoggedIn){
//   return <Redirect to='/home'/>
// } 
    return (
      <>
        <div className="container">
          <div>
            <form onSubmit={handleSubmit}>
              <h2>Log-In Page</h2>
              <div>
                <div>
                  <input
                    className="validate"
                    type="username"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>
              </div>
              <div>
                <div>
                  <input
                    className="validate"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div>
                <div>
                  <Link to="/signup">
                    <button
                      type="button"
                      name="action"
                    >
                      New?
                      <br />
                      Sign Up here.
                    </button>
                  </Link>
                </div>
                <div>
                  <button type="submit" name="action">
                    Log-In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}

export default Landing;
