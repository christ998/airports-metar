import React from 'react';
import {getAirportInfo, getMetar} from "@/requests";

function FetchData({setAirport, setMetar, setError}) {

    const fetch = async (icao) => {
        try {
            const metar = await getMetar(icao)
            const arpt = await getAirportInfo(icao)
            if (metar.data.error) {
                setError(metar.data.error)
                return
            }
            setAirport(arpt.data)
            setMetar(metar.data.data[0])
        } catch (error) {
            setError(error)
        }
    }

    return fetch

}

export default FetchData;