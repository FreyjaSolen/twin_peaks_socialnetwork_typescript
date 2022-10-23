import { type } from "os";
import { authAPI } from "../api/AuthAPI";
import { AppStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';

enum STATUS { SUCCESS = 0, UNKNOWN =  2, CAPCHA = 10 }
const SET_USER_PROFILE = 'auth/SET_USER_PROFILE';
const TOGGLE_FETCH = 'auth/TOGGLE_FETCH';

// export type InitialStateType = {
//     userId: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean,
//     isFetching: boolean
// }
// let initialState : InitialStateType = {
//     userId: null,
//     email: null,
//     login: null,
//     isAuth: false,
//     isFetching: false
// };

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    isFetching: false as boolean,
};
export type InitialStateType = typeof initialState;

type ActionsTypes = SetUserProfileType | ToggleFetchType 

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_PROFILE: {
            return {
                ...state,
                // ...action.data
                userId: action.data.userId,
                email: action.data.email,
                login: action.data.login,
                isAuth: action.data.isAuth
            }
        }

        case TOGGLE_FETCH: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        default: return state;
    }
}

type SetUserProfileDataType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    data: SetUserProfileDataType
}
type ToggleFetchType = {
    type: typeof TOGGLE_FETCH,
    isFetching: boolean
}

const setUserProfile = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserProfileType => ({ type: SET_USER_PROFILE, data: { userId, email, login, isAuth } })
const toggleFetch = (isFetching: boolean): ToggleFetchType => ({ type: TOGGLE_FETCH, isFetching })

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
// ThunkCreator
export const getUserInfo = (): ThunkType => async (dispatch) => {
    dispatch(toggleFetch(true));
    let Response = await authAPI.getMe();

    if (Response.data.resultCode === STATUS.SUCCESS) {
        let { id, email, login } = Response.data.data;
        dispatch(setUserProfile(id, email, login, true));
    }
    dispatch(toggleFetch(false));
}

export const checkLogin = (email: string, password: string, rememberMe: boolean, setError: any, 
    captcha: null | boolean | string): ThunkType => async (dispatch) => {
    dispatch(toggleFetch(true));

    let Response = await authAPI.setLogin(email, password, rememberMe, captcha);
    if (Response.data.resultCode === STATUS.SUCCESS) {
        // userId = Response.data.userId;
        dispatch(getUserInfo());
    }
    else if (Response.data.resultCode === STATUS.CAPCHA) {
        let Response = await authAPI.getCapcha();
        setError('password', { type: 'capcha', message: Response.data.url });
    }
    else {
        setError('password', { type: 'server', message: Response.data.messages });
    }
    dispatch(toggleFetch(false));
}

export const outLogin = (): ThunkType => async (dispatch) => {
    dispatch(toggleFetch(true));
    let Response = await authAPI.deleteLogin();
    if (Response.data.resultCode === STATUS.SUCCESS) {
        dispatch(setUserProfile(null, null, null, false));
    }
    dispatch(toggleFetch(false));
}

export default authReducer;