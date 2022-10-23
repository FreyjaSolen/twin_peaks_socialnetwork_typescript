import React, {useEffect} from 'react';
import Settings from './Settings';
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profileReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { HocRedirect } from '../../hoc/HocRedirect';
import Preloader from '../common/Preloader/Preloader'
import { AppStateType } from '../../redux/reduxStore';
import { ProfileType } from '../../types/types';

type PropsType = {
    myID: number,
    isMe: boolean,
    profile: ProfileType,
    userStatus: string,

    getStatus: (myID: number) => void,
    updateStatus: (localStatus: string) => void,
    getProfile: (myID: number, isMe: boolean) => void,
    savePhoto: (files: File) => void,
    saveProfile: (data: object, setError: any) => void
}
type MapStatePropsType = {
    myID: number | null,
    isMe: boolean,
    profile: ProfileType | null,
    userStatus: string
  }

const SettingsContainer: React.FC<PropsType> = (props) => {

    useEffect(() => {
        if (!props.isMe){
                props.getStatus(props.myID);
                props.getProfile(props.myID, true);                             
            }
            props.getStatus(props.myID);
    })
   
    if (!props.isMe) {
        return <Preloader />
      }

    return (
        <Settings {...props}
            profile={props.profile}
            userStatus={props.userStatus}
            updateStatus={props.updateStatus}
            savePhoto={props.savePhoto} 
            saveProfile={props.saveProfile}/>
    );
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({ 
    myID: state.authPage.userId,
    isMe: state.profilePage.isMe,
    profile: state.profilePage.profile,
    userStatus: state.profilePage.userStatus
});

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    HocRedirect
)(SettingsContainer)