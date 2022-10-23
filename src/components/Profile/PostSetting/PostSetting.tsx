import React from 'react';
import style from './PostSetting.module.css';
import Post from './Post/Post';
import PostForm from './PostForm/PostForm';
import { PostMessageType } from '../../../types/types';

type PropsType = {
  postMessages: Array<PostMessageType>,
  addPost: (newPost: string) => void
}

const PostSetting: React.FC<PropsType> = (props) => {

  let mapPostMsg = props.postMessages.map(txtPost => ( <div key={txtPost.id}> 
    <Post post={txtPost} />
    </div>
  ));
  //правильный, не изменяющий массив в state реверс
  // let mapPostMsg = state.postMessages.map(txtPost => (
  //   <Post post={txtPost.post} />
  // )).reverse();

  return (
    <div className={style.postSettingContainer}>
      <div>
        <PostForm addPost={props.addPost}/>
      </div>
      <div>
        {mapPostMsg}
      </div>
    </div>
  );
}

export default PostSetting;