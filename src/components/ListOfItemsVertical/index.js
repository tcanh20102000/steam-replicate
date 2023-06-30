import AGameVertical from "../AGameVertical";
import styles from "./ListOfItemsVertical.module.css";
import {useCustomContext} from "../../reducer/CustomContext/CustomContext";


import React from "react";

function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}

const ListOfItemVerticalJSX = ({ list, type, thumbnail }) => {
  console.log('input jsx ', list);
  if (!isIterable(list)) {

    return <></>;
  }
  const listOfItem = list.map((val, index) => { 
      return <AGameVertical key={index} {...val} />;
   
  });
  return (
    <div>
      {thumbnail ? <h2 className={styles.thumbnail}>{thumbnail}</h2> : <></>}
      <div className={styles.vertical_list}>{listOfItem}</div>
    </div>
  );
};


export default function ListOfItemsVertical(props) {
    const { state, dispatch } = useCustomContext();

    const [currIndex, setcurrIndex] = React.useState(state.currentPage);
    
    return (
      <div className={styles.list_capsule}>
        <div className={styles.header}>
          <span>All Item</span>
        </div>
        <ListOfItemVerticalJSX list={state.payload} />
      </div>
    );
}
/* <div className={styles.list_capsule}>
        <ListOfItem list={currentPosts} thumbnail={thumbnail} type={type} />
        <Paginate
            currIndex={currIndex}
            numbOfPostsPerPage={postPerPage}
            totalNumOfPosts={itemList.length}
            paginate={paginate}
        />
        </div> */