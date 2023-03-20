import {useEffect, useState} from 'react';
import {calculateCrossWind, calculateHeadWind} from "@/components/helpers/runwayCalculator";
import fetchData from "@/hooks/fetchData";

function UseAirport(icao) {
    const [airportData, setAirportData] = useState(null)
    const [metar, setMetar] = useState(null)
    const [error, setError] = useState("")

    const fetchAirport = fetchData({
        setAirport: setAirportData,
        setMetar: setMetar,
        setError: setError,
    })

    useEffect(() => {
        fetchAirport(icao)
    }, [])


    const runways = []
    if (airportData && metar) {
        airportData.runways?.forEach(runway => {
            const he_runway_parallelWind = calculateHeadWind(metar.wind_direction.value, metar.wind_speed.value, runway.he_heading_degT)
            const runway_crossWind = calculateCrossWind(metar.wind_direction.value, metar.wind_speed.value, runway.he_heading_degT)
            const he_status =
                he_runway_parallelWind ?
                    (he_runway_parallelWind < 0 ? "Tailwind"
                        :
                        (runway_crossWind > Math.abs(he_runway_parallelWind)) ? "Crosswind" : "Headwind") : "Variable";
            const le_status =
                he_status !== "Variable" ?
                he_status == "Tailwind" ? ((runway_crossWind > Math.abs(he_runway_parallelWind)) ? "Crosswind" : "Headwind") : "Tailwind" : "Variable";

            runways.push({
                status: he_status,
                name: runway.he_ident,
                heading: runway.he_heading_degT,
                windParallel: Math.abs(he_runway_parallelWind),
                crossWind: runway_crossWind,
                ils: runway.he_ils?.freq
            })
            runways.push({
                status: le_status,
                name: runway.le_ident,
                heading: runway.le_heading_degT,
                windParallel: Math.abs(he_runway_parallelWind),
                crossWind: runway_crossWind,
                ils: runway.le_ils?.freq
            })

        })

    }
    runways.sort((a, b) => {
        const orden = {"Headwind": 1, "Crosswind": 2, "Tailwind": 3};

        return orden[a.status] - orden[b.status];
    })
    return [runways, airportData, metar]

}

export default UseAirport;