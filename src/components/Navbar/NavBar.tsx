import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';

const NavBar = () => {
    return (
        <nav className={style.navBar}>
            <div>
                <NavLink to='/profile' className={({ isActive }) => (isActive ? style.active : style.item)}>
                    Profile
                </NavLink>
            </div>
            <div>
                <NavLink to='/messenger' className={({ isActive }) => (isActive ? style.active : style.item)}>
                    Messages
                </NavLink>
            </div>
            <div>
                News
            </div>
            <div>
                Friends
            </div>
            <div>
                <NavLink to='/settings' className={({ isActive }) => (isActive ? style.active : style.item)}>
                    Settings
                </NavLink>
            </div>
            <div>
                <NavLink to='/allUsers' className={({ isActive }) => (isActive ? style.active : style.item)}>
                    <p>All users</p>
                </NavLink>
            </div>
        </nav>
    );
}

export default NavBar;
