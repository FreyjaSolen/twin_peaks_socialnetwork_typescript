import React from 'react';
import style from './InfoText.module.css';

type PropsType = {
    conTitle: string,
    conValue: string,
}

const InfoText: React.FC<PropsType> = ({conTitle, conValue}) => {

    return (
        <div className={style.wrapper}>
        <div className={style.description}>
            <b>{conTitle}</b>: 
        </div>
        <div className={style.description}>
            {conValue}
        </div>
        </div>
    );
}

export default InfoText;