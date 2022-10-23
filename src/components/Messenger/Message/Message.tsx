import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Message.module.css';

type PropsType = {
    id: number,
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={style.dialogsItem}>
            <div>
                {props.message}
            </div>
        </div>
    );
}

export default Message;