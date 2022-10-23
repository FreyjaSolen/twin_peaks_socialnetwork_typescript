import React from 'react';
import { addPost } from '../../../redux/profileReducer';
import PostSetting from './PostSetting';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/reduxStore';
import { PostMessageType } from '../../../types/types';

type MapStatePropsType = {
  postMessages: Array<PostMessageType>
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    postMessages: state.profilePage.postMessages
  }
}
type MapDispatchPropsType = {
  addPost: (postText: string) => void
}
type OwnPropsType = {}

const PostSettingContainer = connect<MapStatePropsType, MapDispatchPropsType,  OwnPropsType, AppStateType>(mapStateToProps, 
  {addPost})(PostSetting);


export default PostSettingContainer;