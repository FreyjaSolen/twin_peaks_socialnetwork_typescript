import React from 'react';
import style from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostSettingContainer from './PostSetting/PostSettingContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
    IsMe: boolean,
    userStatus: string,
    profile: ProfileType,
    updateStatus: (localStatus: string) => void
  }

const Profile: React.FC<PropsType> = React.memo((props) => {
    return (
        <div className={style.profile}>
            <div className={style.profileWrapper}>
            <ProfileInfo profile={props.profile} 
            IsMe={props.IsMe}
            userStatus = {props.userStatus}
            updateStatus = {props.updateStatus}/>
            <PostSettingContainer />
            </div>            
      </div>
    );
});

export default Profile;