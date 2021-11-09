import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/session';

function ProfileButton ({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const handleMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    }

    useEffect(() => {
        if (showMenu) {
            document.addEventListener('click', handleMenu);
            return () => document.removeEventListener('click', handleMenu);
        }
        else {
            return;
        }
    }, [showMenu])

    return (
        <div className='nav-profile-button-container'>
            <button className='nav-profile-button' onClick={handleMenu}>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (
                <ul className='nav-dropdown'>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;