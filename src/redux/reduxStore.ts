import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import profileReducer from './profileReducer';
import messengerReducer from './messengerReducer';
import allUsersReducer from "./allUsersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from 'redux-thunk';

let redusers = combineReducers({
    profilePage: profileReducer,
    messengerPage: messengerReducer,
    allUsersPage: allUsersReducer,
    authPage: authReducer
});

type ReduserType = typeof redusers;
export type AppStateType = ReturnType<ReduserType>;

// для выведения типа из action-объекта
export type ActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never;

let store = legacy_createStore(redusers, applyMiddleware(thunkMiddleware));

// window.store = store;

export default store;