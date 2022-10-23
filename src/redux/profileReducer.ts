import { profileAPI } from '../api/ProfileAPI';
import { PhotoType, PostMessageType, ProfileType } from '../types/types';
import { AppStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';

const ADD_POST = 'profile/ADD-POST';
const SET_PROFILE = 'profile/SET_PROFILE';
const GET_STATUS = 'profile/GET_STATUS';
const SAVE_PHOTO = 'profile/SAVE_PHOTO';
const CHANGE_PROFILE = 'profile/CHANGE_PROFILE';
const SAVE_PROFILE = 'profile/SAVE_PROFILE';

let initialState = {
    postMessages: [
        { id: 1, post: 'Hello' },
        { id: 2, post: 'Welcome to twin peaks' },
        { id: 3, post: 'Dreamtown' },
        { id: 4, post: '1990' },
        { id: 5, post: 'Enjoy' }
    ] as Array<PostMessageType>,
    profile: null as ProfileType | null,
    userStatus: '',
    isMe: false
};

export type InitialStateType = typeof initialState;

type ActionsTypes = AddPostType | SetProfileType | GetUserStatusType |
    SetUserPhotoType | SaveProfileInfoType | ChangeProfileType

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostMessageType = {
                id: state.postMessages.length + 1,
                post: action.newPost
            };
            return {
                ...state,
                postMessages: [...state.postMessages, newPost]
            }
        }

        case SET_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }

        case GET_STATUS: {
            return {
                ...state,
                userStatus: action.userStatus
            }
        }

        case SAVE_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }

        case CHANGE_PROFILE: {
            return {
                ...state,
                isMe: action.user
            }
        }

        case SAVE_PROFILE: {
            return {
                ...state,
                profile: {...state.profile, aboutMe: action.profile.aboutMe,
                lookingForAJobDescription: action.profile.lookingForAJobDescription,
                lookingForAJob: action.profile.lookingForAJob,
                contacts: action.profile.contacts} as ProfileType
            }
        }

        default: return state;
    }
}

type AddPostType = {
    type: typeof ADD_POST,
    newPost: string
}
export const addPost = (newPost: string): AddPostType => ({ type: ADD_POST, newPost })

type SetProfileType = {
    type: typeof SET_PROFILE,
    profile: ProfileType
}
type GetUserStatusType = {
    type: typeof GET_STATUS,
    userStatus: string
}
type SetUserPhotoType = {
    type: typeof SAVE_PHOTO,
    photos: PhotoType
}
type SaveProfileInfoType = {
    type: typeof SAVE_PROFILE,
    profile: ProfileType
}
type ChangeProfileType = {
    type: typeof CHANGE_PROFILE,
    user: boolean
}
const setProfile = (profile: ProfileType): SetProfileType => ({ type: SET_PROFILE, profile });
const getUserStatus = (userStatus: string): GetUserStatusType => ({ type: GET_STATUS, userStatus });
const setUserPhoto = (photos: PhotoType): SetUserPhotoType => ({type: SAVE_PHOTO, photos});
const saveProfileInfo = (profile: ProfileType): SaveProfileInfoType => ({type: SAVE_PROFILE, profile });
export const changeProfile = (user: boolean): ChangeProfileType => ({type: CHANGE_PROFILE, user});

type GetStateType = () => AppStateType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
// ThunkCreator
export const getProfile = (id: number, isMe: boolean): ThunkType => async (dispatch) => {
    let Response = await profileAPI.getProfile(id);
    dispatch(setProfile(Response.data));
    dispatch(changeProfile(isMe));
}

export const getStatus = (id: number): ThunkType => async (dispatch) => {
    let Response = await profileAPI.getStatus(id);
    dispatch(getUserStatus(Response.data));
}
// export const getStatus = (id: number) => (dispatch: any) => {
//     profileAPI.getStatus(id).then(Response => {
//         dispatch(getUserStatus(Response.data));
//     });    
// }

export const updateStatus = (userStatus: string): ThunkType => async (dispatch) => {
    let Response = await profileAPI.setStatus(userStatus);
    if (Response.data.resultCode === 0) {
        dispatch(getUserStatus(userStatus));
    }
}

export const savePhoto = (photos: File): ThunkType => async (dispatch) => {
    let Response = await profileAPI.setPhoto(photos);
    if (Response.data.resultCode === 0) {
        dispatch(setUserPhoto(Response.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType, setError: any): ThunkType => async (dispatch) => {
    let Response = await profileAPI.setProfileInfo(profile);
    if (Response.data.resultCode === 0) {
        dispatch(saveProfileInfo(profile));
    }
    else {
        setError('server', { type: 'server', message: Response.data.messages });
    }
}

export default profileReducer;