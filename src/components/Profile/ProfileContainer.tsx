import React, { useEffect } from 'react';
import Profile from './Profile';
import { getProfile, getStatus, updateStatus } from '../../redux/profileReducer';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { compose } from 'redux';
import { HocRedirect } from '../../hoc/HocRedirect';
import { ProfileType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    IsMe: boolean,
    profile: ProfileType | null,
    userStatus: string,
    IsAuth: boolean,
    myID: number | null
}
type MapDispatchPropsType = {
    getProfile: (userId: number, isMe: boolean) => void,
    getStatus: (userId: number) => void,
    updateStatus: (localStatus: string) => void
}
type RoutePropsType = {
    params: any
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RoutePropsType;

const ProfileContainer: React.FC<PropsType> = (props) => {

    useEffect(() => {
        let userId: number;
        if (props.params.userId == undefined) {
            userId = -1;
        }
        else {
            userId = +props.params.userId;
        }
        let isMe = false;
        if (userId == -1) {
            if (props.IsAuth) {
                userId = props.myID as number;
                isMe = true;
            }
        }
        props.getProfile(userId, isMe);
        props.getStatus(userId);
    }, [props.params.userId])

    return (
        <Profile {...props}
            IsMe={props.IsMe}
            profile={props.profile as ProfileType}
            userStatus={props.userStatus}
            updateStatus={props.updateStatus} />
    );
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    IsMe: state.profilePage.isMe,
    profile: state.profilePage.profile,
    userStatus: state.profilePage.userStatus,
    IsAuth: state.authPage.isAuth,
    myID: state.authPage.userId
});

const GetParams: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    return <ProfileContainer {...props} params={useParams()} />
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getProfile, getStatus, updateStatus }),
    HocRedirect
)(GetParams)