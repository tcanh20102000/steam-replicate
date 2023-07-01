import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './AGameVertical.module.css';
import axios from "axios";
import { Constant } from "../../const/Const";

const TIMEOUT = Constant.TIMEOUT;
const CallHostAPI = `${Constant.RootAPI}/get_app_detail`;

export default function AGameVertical(props) {
    const {  discount, src, appid } = props;
    
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/app/${appid}`);
    };

    const [loading, setLoading] = React.useState(false);
    const [ready, setReady] = React.useState(false);
    const [data, setData] = React.useState({data: {}, search: true});
    

    const [price, setPrice] = React.useState({
      initial_formatted: '',
      final_formatted: '',
      discount_percent: '',
      currency: '',
      free_to_play: false,
      purchase_able: true,
    });


    React.useEffect(() => {
      const getAppDetailAPI = CallHostAPI + `/app/${appid}`;
      const fetchData = async (URL, setLoading) => {
        let ret = [];

        try {
            setLoading(true);
            const res1 = await axios.get(URL, {
            timeout: TIMEOUT,
            });
            if (res1 != null && res1.data != null) {
              ret = res1.data[`${appid}`];
              setData({data:ret.data, search: true});

              console.log("AGAMEVertical Done fetch");
             
              
              console.log("Data", ret.data);
              if (!ret.data || Object.keys(ret.data).length === 0) {
                console.log("No data");
              }
              if (ret.data.is_free) {
                console.log("hre1");
                setPrice((prevPrice) => ({
                  ...prevPrice,
                  free_to_play: true,
                }));
              }
              else if (!ret.data.price_overview) {
                console.log("No price_overview");
                setPrice((prevPrice) => ({
                  ...prevPrice,
                  purchase_able: false,
                }));
              }
              if (ret.data.price_overview) {
                console.log("hre2", ret.data.price_overview);
                let tmp = ret.data.price_overview;
                if (tmp.discount_percent != "0") {
                  setPrice((prevPrice) => ({
                    ...prevPrice,
                    initial_formatted: tmp.initial_formatted,
                    final_formatted: tmp.final_formatted,
                    discount_percent: tmp.discount_percent,
                    currency: tmp.currency,
                  }));
                } else {
                  setPrice((prevPrice) => ({
                    ...prevPrice,
                    final_formatted: tmp.final_formatted,
                    discount_percent: tmp.discount_percent,
                    currency: tmp.currency,
                  }));
                }
                console.log("price", price);
              }
              if (
                ret.data.price_overview &&
                ret.data.price_overview.discount_percent
              ) {
                console.log("hre3");
              }
              setLoading(false);
              setReady(true);
            }
        } 
        catch (err) {
            setData((prevData) => ({
              ...prevData,
              search: false,
            }));
            console.log(err);
            setLoading(false);
            setReady(true);          
        }      
        return ret;
      };
      fetchData(getAppDetailAPI, setLoading);

    }, [appid]);

    React.useEffect(()=>{
      if(!ready){
        return;
      }
      console.log('price', price);
    }, [ready])

    
    let display_price = price.free_to_play ? "Free to play" : `${price.final_formatted}`;
    let display_discount = discount === "0" ? undefined : `-${discount}% `;
    return (
      <div className={styles.gameCapsule} onClick={handleClick}>
        {loading ? (
          <div className={styles.center_loader}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <>
            <div className={styles.thumbCap}>
              <img src={src} className={styles.thumbnail} alt='' />
            </div>
            <div className={styles.content}>
              <div className={styles.info}>
                <h2 onClick={handleClick}>{data.data.name}</h2>
              </div>
              {price.purchase_able && (
                <div className={styles.price}>
                  {display_discount ? (
                    <div className={styles.discount}>{display_discount}</div>
                  ) : (
                    <></>
                  )}
                  <div className={styles.finalPrice}>{display_price}</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
}
