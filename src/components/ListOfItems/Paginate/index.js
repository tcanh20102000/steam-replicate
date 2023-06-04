import React from "react";
import styles from './Paginate.module.css';

const Paginate = ({
  currIndex,
  numbOfPostsPerPage,
  totalNumOfPosts,
  paginate,
}) => {
    var totalPages =
      totalNumOfPosts % numbOfPostsPerPage === 0
        ? Math.floor(totalNumOfPosts / numbOfPostsPerPage)
        : Math.floor(totalNumOfPosts / numbOfPostsPerPage) + 1;
    const resList = Array.from({ length: totalPages }, (_, i) => i + 1);
    const buttonLists = resList.map((pageNum, index)=>{
        return (
          <li key={index}>
            <button
              onClick={() => {
                paginate(pageNum);
              }}
              className={
                pageNum === currIndex
                  ?  styles.button_focus 
                  :  styles.button
              }
            >
              
            </button>
          </li>
        );
    });
    
    return (
        <>
          <ul className={styles.pagination}>{buttonLists}</ul>
        </>
    );
};

export default Paginate;