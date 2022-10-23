import React, { useState } from 'react';
import style from './ProfileInfo.module.css';
import headerImage from '../../../images/heat.jpg';
import userPhoto from '../../../images/default.jpg';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import InfoText from '../../common/InfoText/InfoText'
import Preloader from '../../common/Preloader/Preloader'
import { ContactsType, ProfileType } from '../../../types/types';

type PropsType = {
  IsMe: boolean,
  userStatus: string,
  profile: ProfileType,
  // contacts: ContactsType,
  updateStatus: (localStatus: string) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {

  let [localInfo, setDetails] = useState(false);

    if (!props.profile) {
    return <Preloader />
  }

  const onChangeInfo = () => {
    setDetails(!localInfo);
  }

  return (
    <div className={style.profileInfoContainer}>
      <div>
        <img src={headerImage} className={style.mainImage} />
      </div>
      <div className={style.profileInfo}>
        <div>
          <img src={props.profile.photos?.large != null ? props.profile.photos.large : userPhoto} className={style.avaPhoto} />
        </div>
        <div className={style.info}>
          <div>
            <ProfileStatus userStatus={props.userStatus}
            IsMe={props.IsMe}
            updateStatus={props.updateStatus} />
            <div>
              {props.profile.fullName}
            </div>
            <div className={style.status}>
              {props.profile.aboutMe}
            </div>
            <div>
              <button onClick={onChangeInfo}
                className={style.buttonInfo} >
                {localInfo ? 'Hide details' : 'Show details'}
              </button>
            </div>
          </div>
          {localInfo && <div>
            Info:
            <div className={style.delails}>
            <b>Skills:</b> {props.profile.lookingForAJobDescription}
            </div>
            <div className={style.delails}>
            <b>Is looking for a job:</b> {props.profile.lookingForAJob? 'yes' : 'no'}
            </div>
            <div className={style.delails}>
              <b>Contacts:</b>
            </div>
            {Object.keys(props.profile.contacts).map(c => {
              return ( <InfoText key={c}
                conTitle={c}
                conValue={props.profile.contacts[c as keyof ContactsType]}/>)
            })}
          </div>}
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;