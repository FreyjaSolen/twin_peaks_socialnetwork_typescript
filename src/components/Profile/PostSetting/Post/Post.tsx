import React from 'react';
import style from './Post.module.css';
import avaIcon from '../../../../images/default.jpg';
import {PostMessageType} from '../../../../types/types';

type PropsType = {
  post: PostMessageType
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={style.postContainer}>
        <div className={style.post}>
          <img src={avaIcon}/>
            {props.post.post}    
        </div>
      </div>
    );
}

export default Post;