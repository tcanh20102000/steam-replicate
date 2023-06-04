import styles from './Navbar.module.css';
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
    return (
      <>
        <nav className={styles.navbar}>
          <div className={styles.homepage}>
            <Link to="/" className={styles.homepageText}>STEAM</Link>
          </div>
        </nav>
      </>
    );
}