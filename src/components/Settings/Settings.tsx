import React, { useState, ChangeEvent } from 'react';
import HeadImg from '../common/HeadImg/HeadImg';
import style from './Settings.module.css';
import userPhoto from '../../images/default.jpg';
import DescriptionForm from './DescriptionForm/DescriptionForm';
import { ProfileType } from '../../types/types';

type PropsType = {
    userStatus: string,
    profile: ProfileType,
    updateStatus: (localStatus: string) => void,
    savePhoto: (files: File) => void,
    saveProfile: (data: object, setError: any) => void
}

const Settings: React.FC<PropsType> = React.memo((props) => {

    let [localStatus, setStatus] = useState(props.userStatus);

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.currentTarget.value);
    }

    const onUpdateStatus = () => {
        props.updateStatus(localStatus);
    }

    return (
        <div className={style.settingsWrapper}>
            <HeadImg />
            <div className={style.tittle}>Hello, {props.profile.fullName}</div>
            <div className={style.settingsContainer}>
                <div className={style.block}>
                    <div className={style.description}>
                        Your current photo:
                    </div>
                    <div>
                        <img src={props.profile.photos?.small ? props.profile.photos.small : userPhoto} className={style.userImg} />
                    </div>
                    <div>
                        <input type={"file"} onChange={onPhotoSelected} />
                    </div>
                </div>
                <div className={style.block}>
                    <div className={style.description}>
                        Your current status:
                    </div>
                    <div>
                        <input value={localStatus}
                            onChange={onStatusChange} />
                    </div>
                    <div>
                        <button onClick={onUpdateStatus} className={style.buttonOk}>Change</button>
                    </div>
                </div>
            </div>
            <div className={style.tittle}>General info:</div>
                <DescriptionForm 
                profile = {props.profile}
                saveProfile = {props.saveProfile}/>
        </div>
    );
});

export default Settings;