import React from 'react';
import style from './Enter.module.css';
import headerImage from '../../images/heat.jpg';
import { connect } from 'react-redux';
import {checkLogin} from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import Login from './Login';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    isAuth: boolean,
  }
type MapDispatchPropsType = {
    checkLogin: (email: string, password: string, rememberMe: boolean,
        setError: any, captcha: null | boolean | string) => void
  }
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const Enter: React.FC<PropsType> = (props) => {

    if (props.isAuth)
    {
        return <Navigate to={'/profile'} />;
    }
    return (
        <div className={style.enterWrapper}>
            <div>
                <img src={headerImage} className={style.mainImage} />
            </div>
            <div className={style.greetings}>
                <h1>Welcome to Twin Peaks!</h1>
            </div>
            <Login checkLogin = {props.checkLogin}/>
        </div>
    );
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.authPage.isAuth
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType,  OwnPropsType, AppStateType>(mapStateToProps, {checkLogin})(Enter);