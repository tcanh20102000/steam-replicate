import React from "react";
import styles from './Footer.module.css';

export function Footer(){
    return (
      <div className={styles.page_wrapper}>
        <div className={styles.line}></div>
        <div className={styles.ctn}>
          All of the resource are rightfully belong to Valve Corporation.
        </div>
        <div className={styles.line}></div>
      </div>
    );
}