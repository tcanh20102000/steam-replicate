import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import ListOfItemsVertical from "../../components/ListOfItemsVertical";
import { ACTION_TYPES } from "../../reducer/GenreAppReducer/action";
import {
  GenreAppReducer,
  INITIAL_STATE,
} from "../../reducer/GenreAppReducer/GenreAppReducer";
import CustomContext from "../../reducer/CustomContext/CustomContext";
import { Constant } from "../../const/Const";

import styles from './GenrePage.module.css';

const TIMEOUT = Constant.TIMEOUT;
const CallHostAPI = `${Constant.RootAPI}/`;


export default function GenrePage(props){
    const { genre } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [state, dispatch] = React.useReducer(GenreAppReducer, INITIAL_STATE);
    const URL = CallHostAPI + `get_multi_apps/get_in_genre/${genre}`;

    const providerState = {
      state,
      dispatch,
    };


    const fetchData = async (URL, setLoading) => {
      let ret='';
      console.log("fetching...");
      try {
        setLoading(true);
        const res1 = await axios.get(URL, {
          timeout: TIMEOUT,
        });
        if (res1 != null && res1.data != null) {
          ret = {...res1.data}
          console.log('res1 data', ret);
          setLoading(false);
          console.log("Done fetch");
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
      return ret;     
    };

    React.useEffect(()=>{
      fetchData(URL, setLoading).then((ret) => {

        const retWithURL = Object.values(ret).map((obj) => ({
          price: obj["price"],
          discount: obj["discount"],
          src: `https://cdn.akamai.steamstatic.com/steam/apps/${obj["appid"]}/header_292x136.jpg`,
          appid: obj["appid"],
        }));
        dispatch({
          type: ACTION_TYPES.FECTH_SUCCESS,
          payload: [...retWithURL],
        });
        console.log('Current state ', ret);
      });
    }, [URL])
    
    
    return (
      <CustomContext.Provider value={providerState}>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className={styles.page_content}>
            <ListOfItemsVertical />
          </div>
        )}
      </CustomContext.Provider>
    );
}
