import React from "react";
import styles from './Cart.module.css';
import { useLocation, useNavigate } from "react-router-dom";


const APP_LIST = 'APP_LIST';

function changeWebTitle(name) {
  document.title = name;
}
function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}


export default function Cart() {

  changeWebTitle("Shopping Cart");

  const location = useLocation();
  const [cartList, setCartList] = React.useState([]);
  const navigate = useNavigate();

  const toGame = (appid) => {
    navigate(`/app/${appid}`);
  }
  const handleRemoveItem = (rmv_appid) => {
    console.log("Target", rmv_appid);
    let newItemList = cartList.filter((item) => item.appid !== rmv_appid);
    setCartList(newItemList);
    localStorage.setItem(APP_LIST, JSON.stringify([...newItemList]));
    window.dispatchEvent(new Event("storage")); //this will force storage event to trigger
  };

  if(location.state){
    //console.log("Param ", location.state.appid);
    if (
      localStorage.getItem(APP_LIST) === null ||
      localStorage.getItem(APP_LIST).length === 0
    ) {
      localStorage.setItem(APP_LIST, JSON.stringify([location.state]));
      window.dispatchEvent(new Event("storage"));
    } else {
      let itemList = localStorage.getItem(APP_LIST);
      itemList = itemList ? JSON.parse(itemList) : [];
      itemList.push(location.state);

      let uniqueItemList = itemList.filter(function (item, index, self) {
        return (
          index ===
          self.findIndex(function (other) {
            return item.appid === other.appid; // compare two objects by their properties
          })
        );
      });
      localStorage.setItem(APP_LIST, JSON.stringify([...uniqueItemList]));
      window.dispatchEvent(new Event("storage"));
    }
  }
  

  React.useEffect(()=>{
    setCartList( JSON.parse(localStorage.getItem(APP_LIST)));
    
  }, []);
  
  //console.log("cart1", cartList);

  const DisplayList = isIterable(cartList) ? (
    cartList.map((item, id) => {
      return (
        <div key={id} className={styles.cart_item}>
          <div className={styles.left}>
            <div
              className={styles.thumbnail}
              onClick={() => toGame(item.appid)}
            >
              <img src={item.appData.header_image} />
            </div>
            <span onClick={() => toGame(item.appid)}>{item.appData.name}</span>
          </div>
          <div className={styles.right}>
            <span onClick={() => toGame(item.appid)}>
              {item.appData.price_overview.final_formatted}
            </span>
            <span
              className={styles.remove}
              onClick={() => handleRemoveItem(item.appid)}            
            >
              Remove
            </span>
          </div>
        </div>
      );
    })
  ) : (
    <></>
  );
  

  return (
    <div className={styles.page_ctn}>
      <div className={styles.__header}>
        <h2>Your shopping cart</h2>
      </div>
      <div className={styles.content_wrapper}>
        {DisplayList}
      </div>
    </div>
  );
}