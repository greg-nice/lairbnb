import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ProfileButton from './ProfileButton';
import { loginUser } from '../../store/session';
import './Navigation.css';

function Navigation ({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();

        const formInfo = {
            credential: "DemoUser",
            password: 'password'
        }

        return dispatch(loginUser(formInfo));
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser}/>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div className='nav-auth-buttons'>
                    <button onClick={handleClick}>Demo</button>
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