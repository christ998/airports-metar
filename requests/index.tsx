import { axiosAirport, axiosMetar } from "../config/AxiosConfig";

export const getAirportInfo = async (icao: String) => {
  const data = await axiosAirport.get(`/${icao}`);
  return data;
};

export const getMetar = async (icao: String) => {
  const data = await axiosMetar.get(`/${icao}`);
  return data;
};
