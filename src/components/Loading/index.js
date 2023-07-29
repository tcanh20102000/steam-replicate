import React from 'react'
import styles from './Loading.module.css';

function LoadingComponent({size}) {
  return (
    <div style={{fontSize: `${size.toString()}`}} className={styles.center_loader}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default LoadingComponent;
