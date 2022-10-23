import React, { useState, ChangeEvent } from 'react';
import { useEffect } from 'react';
import style from './ProfileStatus.module.css';

type PropsType = {
  IsMe: boolean,
  userStatus: string,
  updateStatus: (localStatus: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {

  let [isEdit, setEditMode] = useState(false);
  let [localStatus, setStatus] = useState(props.userStatus);

  useEffect( () => {
    setStatus(props.userStatus);
  }, [props.userStatus])

  const editModeChange = () =>{
    if(isEdit){
      props.updateStatus(localStatus);
      setEditMode(!isEdit);
    }
    else{
      if (props.IsMe){
        setEditMode(!isEdit);
      }
    }  
  }

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.currentTarget.value);
  }
 
    return (
      <div className={style.statusWrapper}>
        {isEdit ?
          <div>
            <input onChange={onStatusChange}
            autoFocus={true} 
            onBlur={editModeChange} 
            value={localStatus} />
          </div>
          :
          <div className={style.status}>
            <span onDoubleClick={editModeChange}>{props.userStatus}</span>
          </div>}
      </div>
    );
  // }
}

export default ProfileStatus;