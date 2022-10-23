import { AppStateType } from './reduxStore';
import { allUsersAPI } from '../api/AllUsersAPI';
import { UserType } from '../types/types';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const FOLLOWING = 'allUsers/FOLLOWING';
const UNFOLLOWING = 'allUsers/UNFOLLOWING';
const SET_USERS = 'allUsers/SET_USERS';
const SET_CURRENT_PAGE = 'allUsers/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'allUsers/SET_TOTAL_USERS_COUNT';
const TOGGLE_FETCH = 'allUsers/TOGGLE_FETCH';
const TOGGLE_REQUEST = 'allUsers/TOGGLE_REQUEST';

// type PhotoType = {
//     small: string | null,
//     large: string | null
// }
// type UserType = {
//     id: number,
//     name: string,
//     status: string | null,
//     photos: PhotoType | null,
//     followed: boolean
// }
let initialState = {
    users: [

        // {"id":"1","NickName":"Creator","Name":"David","LastName":"Lynch","BirthDate":"1946-01-20","Status":"I am creator","Photo":"1"},
        // {"id":"2","NickName":"Agent","Name":"Dale","LastName":"Cooper","BirthDate":"1954-04-19","Status":"Some coffee?","Photo":"2"},
        // {"id":"3","NickName":"Kitten","Name":"Audrey","LastName":"Horne","BirthDate":"1970-08-24","Status":"Like a coffe","Photo":"3"},
        // {"id":"7","NickName":"TheOne","Name":"Laura","LastName":"Palmer","BirthDate":"1972-07-22","Status":"See you in Black Wigwam","Photo":"7"},
        // {"id":"8","NickName":"Sheriff","Name":"Harry S.","LastName":"Truman","BirthDate":"1950-05-13","Status":null,"Photo":"10"},
        // {"id":"9","NickName":"Beauty","Name":"Shelly","LastName":"Briggs","BirthDate":"1969-05-30","Status":"Caught in the middle","Photo":"11"},
        // {"id":"10","NickName":"BestFriend","Name":"Donna","LastName":"Hayward","BirthDate":"1971-09-02","Status":null,"Photo":"12"},
        // {"id":"11","NickName":"BOB","Name":"Bob","LastName":"Killer","BirthDate":null,"Status":"He is BOB, eager for fun. He wears a smile, everybody run.","Photo":"13"}
    ] as Array<UserType>,
    pageSize: 14 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    idRequestWait: [] as Array<number>  //user`s id
};
export type InitialStateType = typeof initialState;

type ActionsTypes = FollowType | UnFollowType | SetUsersType |
    SetCurrentPageType | SetAllUsersCountType | ToggleFetchType | ToggleRequestType
    
const allUsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOWING: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        }
        case UNFOLLOWING: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        }

        case SET_USERS: {
            return { ...state, users: action.users }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }

        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }

        case TOGGLE_FETCH: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case TOGGLE_REQUEST: {
            return {
                ...state,
                idRequestWait: action.isRequestWait ?
                    [...state.idRequestWait, action.id]
                    : state.idRequestWait.filter(id => id != action.id)
            }
        }

        default: return state;
    }
}

type FollowType = {
    type: typeof FOLLOWING,
    id: number
}
type UnFollowType = {
    type: typeof UNFOLLOWING,
    id: number
}
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
type SetAllUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
type ToggleFetchType = {
    type: typeof TOGGLE_FETCH,
    isFetching: boolean
}
type ToggleRequestType = {
    type: typeof TOGGLE_REQUEST,
    isRequestWait: boolean, 
    id: number
}

const follow = (id: number): FollowType => ({ type: FOLLOWING, id })
const unfollow = (id: number): UnFollowType => ({ type: UNFOLLOWING, id })
const setUsers = (users: Array<UserType>): SetUsersType => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage })
const setAllUsersCount = (totalUsersCount: number): SetAllUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount })
const toggleFetch = (isFetching: boolean): ToggleFetchType => ({ type: TOGGLE_FETCH, isFetching })
const toggleRequest = (isRequestWait: boolean, id: number): ToggleRequestType => ({ type: TOGGLE_REQUEST, isRequestWait, id })


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
// ThunkCreator
export const getAllUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {

        dispatch(toggleFetch(true));

        let Response = await allUsersAPI.getAllUsers(currentPage, pageSize);
        dispatch(setUsers(Response.data.items));
        dispatch(setAllUsersCount(Response.data.totalCount));
        dispatch(toggleFetch(false));
    }
}

export const unFollowCommand = (id: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleRequest(true, id));
        let Response = await allUsersAPI.unFollowApi(id);
        if (Response.data.resultCode == 0) {
            dispatch(unfollow(id));
        }
        dispatch(toggleRequest(false, id));
    }
}
export const followCommand = (id: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleRequest(true, id));
        let Response = await allUsersAPI.followApi(id);
        if (Response.data.resultCode == 0) {
            dispatch(follow(id));
        }
        dispatch(toggleRequest(false, id));
    }
}

export default allUsersReducer;