import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({logoutUser, isLoggedIn}) => {
    if(isLoggedIn){
    return (
        <nav>
            <Link to ='/home'>Home</Link>
            <Link to ='/users'>Users</Link>
            <Link to='/profile'>Profile</Link>
            <Link to = '/cookbook'>Cookbook</Link>
            <Link to ='/settings'>Settings</Link>
            <button onClick= {logoutUser}>Log-out</button>
        </nav>
    )
    } 
    return(
        <nav>
            <Link to= '/signup'>Sign Up</Link>
            <Link to= '/login'>Log In</Link>
        </nav>
    )
    
}

export default NavBar;