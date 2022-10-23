import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './MsrActor.module.css';
import avaIcon from '../../../images/default.jpg';

type PropsType = {
    id: number,
    name: string
}

const MsrActor: React.FC<PropsType> = (props) =>{

    let path = '/messenger/' + props.id; 

    return(
        <div className={style.actorWrapper}>
            <NavLink to={path} className={({ isActive }) => (isActive ? style.dialogActorActiv : style.dialogActor)}>
            <img src={avaIcon}/>
            {props.name}
            </NavLink>
        </div>
    );
}

export default MsrActor