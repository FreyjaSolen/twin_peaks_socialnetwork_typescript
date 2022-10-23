import React from 'react';
import style from './Preloader.module.css';
import preloader from './../../../images/Preloader.gif'

const Preloader = () => {
    return (
        <div className={style.divFetch}><img src={preloader}/></div>
    );
}

export default Preloader;