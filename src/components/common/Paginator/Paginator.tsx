import React from 'react';
import style from './Paginator.module.css';

type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChange: (pagesCount: number) => void
}

const Paginator: React.FC<PropsType> = (props) => {

    const stepPage = 7;
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);

    let pages: Array<number> = [];
    if (props.currentPage < (stepPage + 1) / 2){
        for (let i = 0; i < stepPage; i++) {
            pages.push(i + 1);
        }
    }
    else if (props.currentPage + ((stepPage + 1) / 2) > pagesCount) {
        if (props.currentPage === pagesCount){
            for (let i = props.currentPage - stepPage; i < pagesCount; i++) {
                pages.push(i + 1);
            }
        }
        else{            
            for (let i = props.currentPage - (stepPage - (pagesCount - props.currentPage)); i < pagesCount; i++) {
                pages.push(i + 1);
            }
        }
    }
    else {
        for (let i = props.currentPage - ((stepPage - 1) / 2); i < props.currentPage + ((stepPage + 1) / 2); i++) {
            pages.push(i);
        } 
    }

    return (
        <div className={style.pages}>
            {(props.currentPage > (stepPage + 1) / 2) && 
            <span><button onClick={(event) => { props.onPageChange(1); }} 
            className={style.buttonHelper} >1</button>
            <button disabled={true} className={style.buttonEmpty}>...</button></span>}
           
            {pages.map(p => {
                return (<button key={p} onClick={(event) => { props.onPageChange(p); }}
                    className={props.currentPage === p ? style.buttonPageActive : style.buttonPage}>{p}</button>)
            })}
           
            {props.currentPage + (stepPage / 2) < pagesCount && 
            <span>
                <button disabled={true} className={style.buttonEmpty}>...</button>
                <button onClick={(event) => { props.onPageChange(pagesCount); }} 
            className={style.buttonHelper} >{pagesCount}</button></span>}
        </div>
    );
}

export default Paginator;