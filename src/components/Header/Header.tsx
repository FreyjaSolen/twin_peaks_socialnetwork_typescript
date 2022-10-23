import React from 'react';
import { NavLink } from 'react-router-dom';
import headerLogo from '../../images/logo.jpg';
import style from './Header.module.css';

type PropsType = {
    isAuth: boolean,
    login: string | null,
    authChange: () => void
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <header className={style.header}>
            <div>
                <img src={headerLogo}/>
            </div>
            <div className={style.auth}>
                <button onClick = {props.authChange} className={style.buttonLog}> 
                {props.isAuth ? props.login : <NavLink to={'/welcome'} className={style.active} >Login</NavLink>} 
                </button>
            </div>
        </header>
    );
}

export default Header;