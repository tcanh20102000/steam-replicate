import styles from "./Content.module.css";
import ListOfItems from "../ListOfItems";
import React from "react";
import axios from "axios";
import { categoryBgData } from "./data/categoryData";


const TIMEOUT = 10000;
const CallHostAPI = "http://localhost:8080/";

const fetchData = async ( URL, params, setLoading) => {
  let ret = [];
  console.log("fetching ...");
  try {
    setLoading(true);
    const res1 = await axios.get(URL, {
      //headers: { "Access-Control-Allow-Origin": "*" },
      params: params,
      timeout: TIMEOUT,
    });
    if (res1 != null && res1.data != null) {
      Object.keys(res1.data).forEach(function (key) {
        var obj = {};
        obj = res1.data[key];
        ret.push(obj);
      });

      console.log("ret length", ret.length);
      console.log("Done fetch");
      setLoading(false);
    }
  } catch (err) {
    console.log(err);
    setLoading(false);
  }

  return ret;
};

function getRandomGame(setLoading, setData){

  let RandomAPI = CallHostAPI + "get_multi_apps/get_random/";
  let random_param = { limit: 8 };
  var params = new URLSearchParams(random_param);

  fetchData( RandomAPI, params, setLoading).then((ret) => {
    let result_list = [];
    setLoading(true);
    if (!ret) {
      console.log('Empty');
      setData((prevData) => ({
        ...prevData,
        search: false,
      }));
    }
    else{
      
      const retWithURL = ret.map((obj) => ({
        price: obj["price"],
        discount: obj["discount"],
        src: `https://cdn.akamai.steamstatic.com/steam/apps/${obj["appid"]}/header_292x136.jpg`,
        appid: obj["appid"],
      }));
      //console.log("res", retWithURL);
      result_list = [...retWithURL];
      console.log("res1", result_list);
       setData({ data: result_list, search: true });
    }
    setLoading(false);
  });
}

export default function Content(){

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({ data: [], search: true });
  

  React.useEffect(() => {getRandomGame(setLoading,setData);}, []);
  

  return (
    <>
      {loading ? (<h2>Loading...</h2>) :
      (<div className={styles.page_content}>
        <ListOfItems
          itemList={data.data}
          thumbnail="Random game"
          type="game"
        />
        <ListOfItems
          itemList={categoryBgData}
          thumbnail="Browse by Category"
          type="*"
        />
      </div>)
      }
    </>
  );
}