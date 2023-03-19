import Axios from "axios";

export const axiosAirport = Axios.create({
  baseURL: "https://airportdb.io/api/v1/airport",
});

export const axiosMetar = Axios.create({
  // baseURL: "https://api.checkwx.com/metar",
  baseURL: "https://avwx.rest/api/metar"
});

axiosAirport.interceptors.request.use(function (req) {
  req.params = {
    apiToken: process.env.TOKEN,
  };
  return req;
});
axiosMetar.interceptors.request.use(function (req) {
  // req.headers["x-api-key"] = process.env.METAR_TOKEN
  req.headers["Authorization"] = "Bearer "+process.env.METAR_TOKEN
  return req;
});
