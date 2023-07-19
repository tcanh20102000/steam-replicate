import AGame from "../AGame";
import ACategory from "../ACategory";
import Paginate from "./Paginate";
import styles from "./ListOfItems.module.css";
import React from "react";


const postPerPage = 4;

const ListOfItem = ({ list, thumbnail, type }) => {
  if (!list) {
    return <></>;
  }
  const listOfItem = list.map((val, index) => {   
    if(type === 'game'){
      return (        
          <AGame key={index} {...val} />        
      );
    }
    else{
      return(<ACategory key={index} {...val} />)
    }
  });
  return (
    <>
      {thumbnail ? <h2 className={styles.thumbnail}>{thumbnail}</h2> : <></>}
      <div className={styles.horizon_list}>{listOfItem}</div>
    </>
  );
};



export default function ListOfItems(props){
  const {itemList, thumbnail, type} = props;
  
  let DisplayContent = '';
 
  //let list = [1,2]

  const [currIndex, setcurrIndex] = React.useState(1);
  //  React.useEffect(() => {
  //    setTimeout(() => setcurrIndex(), 1000);
  //  }, [currIndex]);

  let w = window.innerWidth;
  
  if(w <= 600){
    console.log('short', itemList);
    DisplayContent = () => {
      return(
        <div className={styles.list_capsule}>
          <ListOfItem list={itemList} thumbnail={thumbnail} type={type} />
        </div>
      )
    }
  }
  else{

    const indexOfLastPost = currIndex * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = itemList.slice(indexOfFirstPost, indexOfLastPost);


    const paginate = (pageIndex) => {
      setcurrIndex(pageIndex);
      //console.log('Click:', currPage);
    };
    DisplayContent = () =>{
      return(
        <div className={styles.list_capsule}>
          <ListOfItem list={currentPosts} thumbnail={thumbnail} type={type} />
          <Paginate
            currIndex={currIndex}
            numbOfPostsPerPage={postPerPage}
            totalNumOfPosts={itemList.length}
            paginate={paginate}
          />
        </div>
      )
    }
  }
  
  return <DisplayContent />;
  
}