import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';

function Navigation () {
    

    return (
        <ul>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <ProfileButton />
        </ul>
    );
}

export default Navigation;