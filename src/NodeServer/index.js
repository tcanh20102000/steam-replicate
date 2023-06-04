const http = require('http');
const axios = require('axios');

const hostname = '127.0.0.1';
const port = 8080;

const TIMEOUT = 30000;
const URL = "http://api.steampowered.com/ISteamApps/GetAppList/v0002/";
const STEAMKEY = "E0D30EBED9AC4899862E1B97F33B21C0";

const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    const fetchData = async () => {
      try {
        const res1 = await axios.get(URL, {
          headers: { "Access-Control-Allow-Origin": "*" },
          params: {
            key: STEAMKEY,
            format: "json",
          },
          timeout: TIMEOUT,
        });
        if (res1 != null) {
          console.log('Hee');
          data = res1.data.applist.apps[0];
          console.log("res.data", data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    res.end("Hello World1");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

