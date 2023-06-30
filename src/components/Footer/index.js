import React from "react";
import styles from './Footer.module.css';

export function Footer(){
    return (
      <div className={styles.page_wrapper}>
        <div className={styles.line}></div>
        <div className={styles.ctn}>This is a Footer</div>
        <div className={styles.line}></div>
      </div>
    );
}