import React from 'react';
import style from './HeadImg.module.css';
import headerImage from '../../../images/heat.jpg';

const HeadImg = () => {
    return (
        <div>
            <img src={headerImage} className={style.mainImage} />
        </div>
    );
}

export default HeadImg;