import styles from "./AppDetail.module.css";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TIMEOUT = 10000;
const CallHostAPI = "http://localhost:8080/get_app_detail";

// const fetchData = async (URL, setLoading) => {
//   let ret = [];
//   console.log("fetching...");
//   try {
//     setLoading(true);
//     const res1 = await axios.get(URL, {
//       //headers: { "Access-Control-Allow-Origin": "*" },
//       //params: params,
//       timeout: TIMEOUT,
//     });
//     if (res1 != null && res1.data != null) {
//       ret = res1.data;

//       //console.log("ret length", ret.length);
//       console.log("Done fetch");
//       setLoading(false);
//     }
//   } catch (err) {
//     console.log(err);
//     setLoading(false);
//   }

// };
function changeWebTitle(name){
  document.title = name;
}

export default function AppDetail(props){
    const { appid } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({ data: [], search: true });

    const Video = (props) => {
      //console.log('src, ', src);
      return (
        <video autoPlay muted loop controls width="100%">
          <source
            src={props.src}
            type="video/webm"
          />
          Sorry, your browser doesn't support embedded videos.
        </video>
      );
    };

    //let appid = '2206320';
    // React.useEffect(
    //   () =>
    //     fetchData(getAppDetailAPI, setLoading).then((ret) => {
    //       console.log("app detail:", ret);
    //     }),
    //   [getAppDetailAPI]
    // );

    React.useEffect(()=>{
      const getAppDetailAPI = CallHostAPI + `/app_and_reviews/${appid}`;
      const fetchData = async (URL, setLoading) => {
        let ret = [];
        console.log("fetching...", appid);

        try {
          setLoading(true);
          const res1 = await axios.get(URL, {
            //headers: { "Access-Control-Allow-Origin": "*" },
            //params: params,
            timeout: TIMEOUT,
          });
          if (res1 != null && res1.data != null) {
            ret = res1.data[`${appid}`];
            changeWebTitle(ret.data.name);
            //console.log("ret length", ret.length);
            setData(ret);
            //console.log('app detail', ret.data.movies[0]);
            console.log("Done fetch");
            setLoading(false);
          }
        } catch (err) {
          setData((prevData) => ({
            ...prevData,
            search: false,
          }));
          console.log(err);
          setLoading(false);
        }
      };
      fetchData(getAppDetailAPI, setLoading);     
    }, [appid])

    const VisualDemo = () =>{
      let returnJSX = () =>{
        return(<></>);
      }
      if(data.data === []){
        
      }
      else if (data.data.hasOwnProperty("movies")) {
        returnJSX = (<Video src={data.data?.movies?.[0].webm?.["480"]} />);
        console.log('ret', returnJSX);
      }
      else if (data.data.hasOwnProperty("screenshots")) {
        returnJSX = (
          <>
            <img src={data.data?.screenshots?.[0].path_thumbnail} />
          </>);
        };
      return returnJSX;
    }
    const Glance = (props) =>{
      if (!props.customer_review) {
        return <></>;
      }
      
      const { review_score_desc, total_reviews } =
        props?.customer_review?.query_summary;

      const { release_date, developers, publishers } = props;
      let date = '';
      if(release_date.comming_soon){
        date = 'Comming Soon';
      }
      else{
        date = release_date.date;
      }

      console.log(review_score_desc, total_reviews);
      return (
        <div className={styles.glance}>
          <div className={styles.row}>
            <div
              className={`${styles.column} ${styles.left} ${styles.grey_text}`}
            >
              <span className={styles.grey_text}>All reviews:</span>
            </div>
            <div className={`${styles.column} ${styles.right}`}>
              <span className={styles.blue_text}>{review_score_desc}</span>
              <span className={styles.grey_text}> ({total_reviews})</span>
            </div>
          </div>
          <div className={styles.row}>
            <div
              className={`${styles.column} ${styles.left} ${styles.grey_text}`}
            >
              <span className={styles.grey_text}>Release date:</span>
            </div>
            <div className={`${styles.column} ${styles.right}`}>
              <span style={{ color: "#8f98a0" }}>{date}</span>
            </div>
          </div>
          <div className={styles.row}>
            <div
              className={`${styles.column} ${styles.left} ${styles.grey_text}`}
            >
              <span className={styles.grey_text}>Developer:</span>
            </div>
            <div className={`${styles.column} ${styles.right}`}>
              <span style={{ color: "#54a5d4" }}>{developers}</span>
            </div>
          </div>
          <div className={styles.row}>
            <div
              className={`${styles.column} ${styles.left} ${styles.grey_text}`}
            >
              <span className={styles.grey_text}>Publisher:</span>
            </div>
            <div className={`${styles.column} ${styles.right}`}>
              <span style={{ color: "#54a5d4" }}>{publishers}</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div
            className={styles.app_page}
            style={{
              background: `url('${data.data.background}') left top no-repeat, #1b2838`,
              backgroundSize: "100% 500px, auto 100%",
            }}
          >
            <div className={styles.header_contain}>
              <div className={styles.title}>{data.data.name}</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.media_and_summary}>
                <div className={styles.video}>
                  <VisualDemo />
                </div>
                <div className={styles.summary}>
                  <img
                    src={data.data?.header_image}
                    className={styles.header}
                  />
                  <div className={styles.app_description_snipper}>
                    {data.data?.short_description}
                  </div>
                  <Glance {...data.data} />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
}
//<Video src={data.data?.movies[0]?.thumbnail}/>