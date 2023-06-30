import styles from './Navbar.module.css';
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
  const [cartLength, setCartLength] = React.useState(0);

  const navigate = useNavigate();
  const toCart = () => {
    navigate(`/cart`);
  };

  const APP_LIST = "APP_LIST";
  React.useEffect(() => {
    function changeCartLength() {
      console.log("change Cart length running");
      let numOfItem =
        localStorage.getItem(APP_LIST) !== null &&
        localStorage.getItem(APP_LIST).length !== 0
          ? JSON.parse(localStorage.getItem(APP_LIST)).length
          : 0;

      setCartLength(numOfItem);
    }
    window.addEventListener("storage", changeCartLength);

    return () => {
      window.removeEventListener("storage", changeCartLength);
    };
  }, [cartLength]);
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.homepage}>
          <Link to="/" className={styles.homepageText}>
            STEAM
          </Link>
        </div>
        {cartLength !== 0 && (
          <div className={styles.to_cart} onClick={toCart}> Cart ({cartLength})</div>
        )}
      </nav>
    </>
  );
}