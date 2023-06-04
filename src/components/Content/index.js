import styles from "./Content.module.css";
import ListOfItems from "../ListOfItems";
import React from "react";
import axios from "axios";
import { listOfGames } from "./data/data";
import { categoryData } from "./data/categoryData";
import ACategory from "../ACategory";


const TIMEOUT = 10000;
// const URL = "http://api.steampowered.com/ISteamApps/GetAppList/v0002/";
// const STEAMKEY = "E0D30EBED9AC4899862E1B97F33B21C0";

const CallHostAPI = "http://localhost:8080/";

const fetchData = async ( URL, params, setLoading) => {
  let ret = [];
  console.log("fetching...");
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
    //setLoading(false);
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
      // const retWithURL = ret.map(obj =>
      //   ({
      //     ...obj,
      //     src: `ttps://cdn.akamai.steamstatic.com/steam/apps/${obj["appid"]}/header_292x136.jpg`,
      //   }));
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

  

    // const [data, setData] = React.useState({ data: [], search: true });
    // const [loading, setLoading] = React.useState(false); 

    // React.useEffect(()=>{
    //     const fetchData = async () =>{
    //         try{
    //             setLoading(true);
    //             const res = await axios.get(CallHostAPI, {
    //               headers: { "Access-Control-Allow-Origin": "*" },
    //               // params: {
    //               //   key: STEAMKEY,
    //               //   format: "json",
    //               // },
    //               timeout: TIMEOUT,
    //             });
    //             if (res != null) {
    //               console.log("res.data", res.data);
    //               setData({ data: res.data, search: true });
    //             }
    //             setLoading(false);
    //         }
    //         catch(err){
    //             setLoading(false);
    //             console.log(err);
    //             setData((prevData) => ({
    //               ...prevData,
    //               search: false,
    //             }));
    //         }
    //     };

    //     fetchData();
    // }, []);
  
  // const handleSetLoading = (bool) => {
  //   setLoading(bool);
  //   //console.log('Click:', currPage);
  // };
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
          itemList={categoryData}
          thumbnail="Browse by Category"
          type="*"
        />
      </div>)
      }
    </>
  );
}