import React, { useEffect } from 'react';
import Header from './Header'
import { getUserInfo, outLogin } from '../../redux/authReducer'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    isAuth: boolean,
    login: string | null
  }
  type MapDispatchPropsType = {
    getUserInfo: () => void,
    outLogin: () => void
  }
  type OwnPropsType = {}
  type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const HeaderContainer: React.FC<PropsType> = (props) => {
   
    useEffect(() => {
        // console.log('Heder');
        props.getUserInfo();
    })

    const authChange = () => {
        if (props.isAuth) {
            props.outLogin();
        }
        else {
            <Navigate to={'/welcome'} />;
        }
    }

    return (
        <Header {...props} authChange={authChange} />
    );
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.authPage.isAuth,
        login: state.authPage.login
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType,  OwnPropsType, AppStateType>(mapStateToProps, { getUserInfo, outLogin })(HeaderContainer);