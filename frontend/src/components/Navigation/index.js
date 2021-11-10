import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation ({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser}/>
        );
    } else {
        sessionLinks = (
            <>
                <div className='nav-auth-buttons'>
                    <NavLink to="/login">Log In</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
            </>
        );
    }

    return (
        <nav className='nav-container'>
            <div className='nav-home-button-container'>
                <div className='nav-home-button'>
                    <NavLink exact to="/">lairbnb</NavLink>
                </div>
            </div>
            {isLoaded && sessionLinks}
        </nav>
    );
}

export default Navigation;