import React from 'react';
import style from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={style.nonContainer}>
           <div className={style.tittle}>This story hasn't been written yet</div>
           <div className={style.error}>404 Not Found</div>
      </div>
    );
}

export default NotFound;