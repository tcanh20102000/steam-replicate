import styles from "./ACategory.module.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function ACategory(props) {
  const { cateLink, cateName, bg} = props;
  const src = `https://store.steampowered.com/categories/homepageimage/category/${cateLink}?cc=us&l=english`;
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/genre/${cateLink}`);
  };
  
  return (
    <div className={styles.content_capsule} onClick={handleClick}>
      <div className={styles.thumbCap}>
        <img src={src} className={styles.thumbnail} />
      </div>
      <div
        className={styles.gradient_div}
        style={{
          background: `${bg}`,
        }}
      />
      <div className={styles.label}>{cateName}</div>
    </div>
  );
}