import React from 'react';
import {getAirportInfo, getMetar} from "@/requests";

interface props {
    setAirport: React.Dispatch<React.SetStateAction<any>>,
    setMetar:React.Dispatch<React.SetStateAction<any>>,
    setError: React.Dispatch<React.SetStateAction<any>>,
}

function FetchData({setAirport, setMetar, setErrorArpt, setErrorMetar, onLoaded}) {

    const fetch = async (icao: String) => {
        try {
            const metar = await getMetar(icao)
            setMetar(metar.data)
        } catch (error) {
            setErrorMetar(error.response?.data?.error)
            onLoaded(false)
        }

        try {
            const arpt = await getAirportInfo(icao)
            setAirport(arpt.data)
            onLoaded(false)
        } catch (error) {
            setErrorArpt(error.response?.data?.message)
            onLoaded(false)
        }
    }

    return fetch

}

export default FetchData;