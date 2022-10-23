import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppStateType } from '../redux/reduxStore';

type MapPropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {}
let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.authPage.isAuth
} as MapPropsType);

export function HocRedirect<PropsType extends object> (Component: React.ComponentType) {

    const RedirectComponent: React.FC<MapPropsType & MapDispatchPropsType> = (props) =>{

        let {isAuth, ...restProps} = props;
        if (!props.isAuth) {
                        return <Navigate to={'/welcome'} />
                    }
        else {
            return (
                <Component {...restProps as PropsType} />
                )
            }
    }

    let ConnectRedirectComponent = connect<MapPropsType, MapDispatchPropsType, PropsType, AppStateType>(mapStateToProps, {})(RedirectComponent)
    return ConnectRedirectComponent;
}