import styles from "./ACategory.module.css";
import React from "react";

export default function ACategory(props) {
  const { cateLink, cateName } = props;
  const src = `https://store.steampowered.com/categories/homepageimage/category/${cateLink}?cc=us&l=english`;
  //console.log("Val", cateLink, cateName);
  return (
    <div className={styles.content_capsule}>
      <div className={styles.thumbCap}>
        <img src={src} className={styles.thumbnail} />
      </div>
      <div
        className={styles.gradient_div}
        style={{
          background: `linear-gradient(rgba(0,0,0,0), rgb(139,0,0) 100%)`,
        }}
      />
      <div className={styles.label}>{cateName}</div>
    </div>
  );
}