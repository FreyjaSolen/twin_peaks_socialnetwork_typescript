import React, {ChangeEvent, useState} from 'react';
import style from './Info.module.css';

type PropsType = {
    conTitle: string,
    conValue: string,
}

const Info: React.FC<PropsType> = ({conTitle, conValue}) => {
    
    let [localValue, setDesc] = useState(conValue);

    const onMeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDesc(event.currentTarget.value);
    }

    return (
        <div className={style.infoWrapper}>
            <div><b>{conTitle}</b>: </div>
            <div><input type='text'
            onChange={onMeChange}
            value={localValue}
            /></div>
        </div>
    );
}

export default Info;