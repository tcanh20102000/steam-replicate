import styles from "./AppDetail.module.css";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { Constant } from "../../const/Const";

import LoadingComponent from "../Loading";

const TIMEOUT = Constant.TIMEOUT;
const CallHostAPI = `${Constant.RootAPI}/get_app_detail`;


function changeWebTitle(name){
  document.title = name;
}

export default function AppDetail(props){
    const { appid } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({ data: [], search: true });

    const navigate = useNavigate();
    const toCart = () => {
      navigate(`/cart`, {state: {appid: appid, appData: data.data }});
    };

    const htmlFrom = (htmlString) => {
      const cleanHtmlString = DOMPurify.sanitize(htmlString, {
        USE_PROFILES: { html: true },
      });
      const html = parse(cleanHtmlString);
      return html;
    };

    const [currentDemoId, setCurrentDemoId] = React.useState({demoId: 0, isMovie: false});

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

    
    React.useEffect(()=>{
      const getAppDetailAPI = CallHostAPI + `/app_and_reviews/${appid}`;
      const fetchData = async (URL, setLoading) => {
        let ret = [];
        console.log("fetching...", appid);

        try {
          setLoading(true);
          const res1 = await axios.get(URL, {
            timeout: TIMEOUT,
          });
          if (res1 != null && res1.data != null) {
            ret = res1.data[`${appid}`];
            changeWebTitle(ret.data.name);
            
            setData(ret);
            
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
    }, [appid]);

    const VisualDemo = (props) => {
      let returnJSX = '';
      if (props === []) {
      } else if (props.hasOwnProperty("movies")) {
        returnJSX = <Video src={props?.movies?.[0].webm?.["480"]} />;
        //console.log("ret", returnJSX);
      } else if (props.hasOwnProperty("screenshots")) {
        returnJSX = (
          <>
            <img src={props.screenshots?.[0].path_thumbnail} alt='Img should show' />
          </>
        );
      }
      return <>{returnJSX}</>
    };
    
    function ImageMovieSlider(props){
      if(!props){        
        return [];
      }
      const {screenshots, movies} = props;
      if(!screenshots || !movies) {
        return [];
      }
      const listOfMovies = movies.map((item,id)=>{
        return(
          {...item, isMovie: true, key: id}
        );
      })
      const listOfScreenshots = screenshots.map((item,id)=>{
        return { ...item, isMovie: false, key: id };
      })
      let displayList = listOfMovies.concat(listOfScreenshots).map((item,id)=>{
        return({...item, demoId: id, key: id});
      })
      console.log('display', displayList);

    }
    //ImageMovieSlider({...data.data});

    
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
    

    function Price(props){
      const { price_overview, package_groups, name, is_free } = props;
      if(is_free){
        return (
          <div className={styles.price_wrapper}>
            <h2>{`Play ${name}`}</h2>

            <div className={styles.buy_section}>             
              <div className={styles.price_tag}>
                <div className={styles.price}>Free To Play</div>
                <div className={styles.cart_button}>Play Game</div>
              </div>          
            </div>
          </div>
        );
      }
      if(!price_overview || !package_groups || !name){
        return <></>
      }
      const { discount_percent, initial_formatted,final_formatted} = price_overview;
      
      return (
        <div className={styles.price_wrapper}>
          <h2>{`Play ${name}`}</h2>
          {discount_percent != 0 && <p>Currently on sale</p>}
          <div className={styles.buy_section}>
            {discount_percent != 0 && (
              <>
                <div className={styles.discount_price_tag}>
                  <div
                    className={styles.discount}
                  >{`-${discount_percent}%`}</div>
                  <div className={styles.price}>
                    <div className={styles.old_price}>{initial_formatted}</div>
                    <div className={styles.new_price}>{final_formatted}</div>
                  </div>
                  <div className={styles.cart_button} onClick={toCart}>
                    Add To Cart
                  </div>
                </div>
              </>
            )}
            {discount_percent == 0 && (
              <>
                <div className={styles.price_tag}>
                  <div className={styles.price}>{final_formatted}</div>
                  <div className={styles.cart_button} onClick={toCart}>
                    Add To Cart
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }

    const DetailReview = (props) =>{
      const {about_the_game} = props;
      const parentRef = React.useRef(null);


      const [readMore, setReadMore] = React.useState(true);
      const [isOverflown, setIsOverflown] = React.useState(false);

      React.useLayoutEffect(() => {
        if (
          parentRef.current !== null &&
          parentRef.current.clientHeight < parentRef.current.scrollHeight
        ) {
          setIsOverflown(true);
        }
      }, [parentRef]);

      

      function setMaxHeight(){
        parentRef.current.style.maxHeight = readMore ? "none" : "850px";
        setReadMore(prevState => !prevState);
      }
      return (
        <>
          <h2>About this game</h2>
          <div className={styles.about_the_game} ref={parentRef}>
            {htmlFrom(about_the_game)}
          </div>
          {isOverflown && (
            <div
              className={styles.show_more_less}
              onClick={() => setMaxHeight()}
            >
              {readMore ? "READ MORE" : "READ LESS"}
            </div>
          )}
        </>
      );
    }
    const SystemRequire = (props) =>{
      const { pc_requirements, mac_requirements, linux_requirements } = props;
      let valList = [pc_requirements, mac_requirements, linux_requirements];
      let displayList = ["Windows", "MacOS", "SteamOS + Linux"];

      const [OSdigit, setOSDigit] = React.useState(0);
      const buttonList = valList.map((item, id)=>{
        if(Array.isArray(item)){
          return(<div key={id}></div>);
        }
        
        return (
          <div key={id}>
            <button
              onClick={() => setOSDigit(id)}
              className={id === OSdigit ? styles.div_focus : styles.normal_div}
              key={id}
            >
              {displayList[id]}
            </button>
          </div>
        );
      })

      let currentOS = valList[OSdigit];
      const { minimum } =
        typeof currentOS !== "undefined" && 
        currentOS.hasOwnProperty("minimum")
          ? currentOS
          : { minimum: "" };
      const { recommended } =
        typeof currentOS !== "undefined" &&
        currentOS.hasOwnProperty("recommended")
          ? currentOS
          : {  recommemded: "" };
      return (
        <>
          <h2>System Requirements</h2>
          <div className={styles.os_option}>{buttonList}</div>
          <div className={styles.os_req}>
            <div>{htmlFrom(minimum)}</div>
            <div>{htmlFrom(recommended)}</div>
          </div>
        </>
      );
    }
    function Achievement(props) {
      const {achievements} = props;
      const { total, highlighted } =
        typeof achievements !== "undefined" &&
        achievements.hasOwnProperty("total") &&
        achievements.hasOwnProperty("highlighted")
          ? achievements
          : { total: undefined, highlighted: undefined };

      if(!total || !highlighted ){
        return(<></>);
      }
      const displayList = highlighted.slice(0, 3).map((item, id) => {
        return (
          <div className={styles.achieve} title={item.name} key={id}>
            <img src={item.path} alt='Should have img in Achieve'/>
          </div>
        );
      });
      displayList.push(
        <div className={styles.show_more} key={displayList.length}>
          View all {total}
        </div>);
      return (
        <div className={styles.achievement}>                
          <p>Include {total} Steam achievements</p>
          <div className={styles.achieve_img}>
            {displayList}           
          </div>          
        </div>
      );
    }

    function SupportedLanguage(props){
      const { supported_languages } = props;
      if(!supported_languages){
        return <></>;
      }
      return(
        <>
          <p>Supported Language:</p>
          {htmlFrom(supported_languages)}
        </>
      )
    }

    return (
      <>
        {loading ? (
          <div
            className={`${styles.whole_page} ${styles.set_div_center}`}
            style={{ backgroundColor: `#1b2838` }}
          >
            <LoadingComponent size="2em" />
          </div>
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
                <div className={styles.grid_wrapper}>
                  <div className={[styles.video, styles.second_col].join(" ")}>
                    <VisualDemo {...data.data} />
                  </div>
                  <div className={[styles.summary, styles.first_col].join(" ")}>
                    <img
                      src={data.data?.header_image}
                      className={styles.header}
                      alt="Summary"
                    />
                    <div className={styles.app_description_snipper}>
                      {data.data?.short_description}
                    </div>
                    <Glance {...data.data} />
                  </div>
                </div>
              </div>
              <div className={styles.grid_wrapper}>
                <div className={styles.first_col}>
                  <Price {...data.data} />
                  <div className={styles.full_game_detail}>
                    <DetailReview {...data.data} />
                  </div>
                  <div className={styles.require}>
                    <SystemRequire {...data.data} />
                  </div>
                </div>
                <div className={styles.second_col}>
                  <Achievement {...data.data} />
                  <div className={styles.language}>
                    <SupportedLanguage {...data.data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
}
