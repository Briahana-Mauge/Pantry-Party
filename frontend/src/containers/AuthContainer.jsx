import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Signup from "../components/Signup";
import LogIn from "../components/LogIn";
import axios from 'axios';

const AuthContainer = ({ username, password, firstname, lastname, email, user, setUser, isLoggedIn, setUsername, setFirstname, setLastname, setPassword, setEmail, setLoggedIn }) => {
    let history = useHistory()
    const signupUser = async () => {
        let payload = {
            email,
            firstname,
            lastname,
            username,
            password,
        };

        try {
            let { data } = await axios.post(
                "/auth/signup",
                payload
            );
            console.log(data)
            loginUser()
        } catch (error) {
            console.log(error);
        }

    }

    const loginUser = async () => {
        let user = {
            username,
            password
        }

        try {
            const { data } = await axios.post('/auth/login', user)
            console.log(data)
            setUser(data.payload)
            console.log('it me:',user);
            setLoggedIn(true)
            history.push('/home') // redirect user to login page
        } catch (error) {
            console.log('err:', error)
        }
        console.log('logging user in')

    }

    return (

        <div>
            <Switch>
                <Route exact path='/'>
                    <LogIn
                        username={username}
                        password={password}
                        user={user}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        setUser={setUser}
                        loginUser={loginUser}
                    /></Route>
                <Route exact path='/signup'>
                    <Signup
                        username={username}
                        password={password}
                        firstname={firstname}
                        lastname={lastname}
                        email={email}
                        user={user}
                        signupUser={signupUser}
                        setUsername={setUsername}
                        setFirstname={setFirstname}
                        setLastname={setLastname}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setLoggedIn={setLoggedIn}
                        setUser={setUser}
                    />
                </Route>
                
            </Switch>
        </div>
    )
}


export default AuthContainer;