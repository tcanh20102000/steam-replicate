import styles from "./AGame.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AGame(props){
    const { price, discount, src, appid } = props;
    const navigate = useNavigate();
    const handleClick = () =>{
      navigate(`/app/${appid}`);
    }

    //const {price, discount, src} = props;
    //console.log('Val',price, discount, src);
    let display_price = price === "0" ? "Free" : `${price}\u20AC`;
    let display_discount = discount === "0" ? undefined : `-${discount}% `;
    return (
      <div className={styles.gameCapsule} onClick={handleClick}>
        <div className={styles.thumbCap}>
          <img src={src} className={styles.thumbnail} />
        </div>
        <div className={styles.info}>
          {display_discount ? (
            <div className={styles.discount}>{display_discount}</div>
          ) : (
            <></>
          )}
          <div className={styles.finalPrice}>{display_price}</div>
        </div>
      </div>
    );
}
//"https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/header_292x136.jpg?t=1683827881";