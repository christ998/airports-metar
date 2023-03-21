import React from 'react';
import {getAirportInfo, getMetar} from "@/requests";

interface props {
    setAirport: React.Dispatch<React.SetStateAction<any>>,
    setMetar:React.Dispatch<React.SetStateAction<any>>,
    setError: React.Dispatch<React.SetStateAction<any>>,
}

function FetchData({setAirport, setMetar, setError}: props) {

    const fetch = async (icao: String) => {
        try {
            const metar = await getMetar(icao)
            const arpt = await getAirportInfo(icao)
            if (metar.data.error) {
                setError(metar.data.error)
                return
            }
            setAirport(arpt.data)
            setMetar(metar.data)
        } catch (error) {
            setError(error)
        }
    }

    return fetch

}

export default FetchData;