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

        airportData.runways.forEach(runway => {
            const he_runway_parallelWind = calculateHeadWind(metar.wind.degrees, metar.wind.speed_kts, runway.he_heading_degT)
            const runway_crossWind = calculateCrossWind(metar.wind.degrees, metar.wind.speed_kts, runway.he_heading_degT)

            if (he_runway_parallelWind > 0 && runway_crossWind <= he_runway_parallelWind) {
                runways.push({
                    status: "Headwind",
                    name: runway.he_ident,
                    heading: runway.he_heading_degT,
                    headWind: he_runway_parallelWind,
                    tailWind: 0,
                    crossWind: runway_crossWind,
                    ils: runway.he_ils?.freq
                })
                runways.push({
                    status: "Tailwind",
                    name: runway.le_ident,
                    heading: runway.le_heading_degT,
                    headWind: 0,
                    tailWind: he_runway_parallelWind,
                    crossWind: runway_crossWind,
                    ils: runway.le_ils?.freq
                })

            } else if (he_runway_parallelWind > 0 && runway_crossWind > he_runway_parallelWind) {
                runways.push({
                    status: "Crosswind",
                    name: runway.he_ident,
                    heading: runway.he_heading_degT,
                    headWind: he_runway_parallelWind,
                    tailWind: 0,
                    crossWind: Math.round(runway_crossWind),
                    ils: runway.he_ils?.freq
                })

                runways.push({
                    status: "Tailwind",
                    name: runway.le_ident,
                    heading: runway.le_heading_degT,
                    headWind: 0,
                    tailWind: he_runway_parallelWind,
                    crossWind: Math.round(runway_crossWind),
                    ils: runway.le_ils?.freq
                })

            } else if (runway_crossWind > -he_runway_parallelWind){
                runways.push({
                    status: "Tailwind",
                    heading: runway.he_heading_degT,
                    name: runway.he_ident,
                    headWind: 0,
                    tailWind: -he_runway_parallelWind,
                    crossWind: runway_crossWind,
                    ils: runway.he_ils?.freq
                })
                runways.push({
                    status: "Crosswind",
                    name: runway.le_ident,
                    heading: runway.le_heading_degT,
                    headWind: -he_runway_parallelWind,
                    tailWind: 0,
                    crossWind: runway_crossWind,
                    ils: runway.le_ils?.freq
                })
            } else {
                runways.push({
                    status: "Tailwind",
                    heading: runway.he_heading_degT,
                    name: runway.he_ident,
                    headWind: 0,
                    tailWind: -he_runway_parallelWind,
                    crossWind: runway_crossWind,
                    ils: runway.he_ils?.freq
                })
                runways.push({
                    status: "Headwind",
                    name: runway.le_ident,
                    heading: runway.le_heading_degT,
                    headWind: -he_runway_parallelWind,
                    tailWind: 0,
                    crossWind: runway_crossWind,
                    ils: runway.le_ils?.freq
                })
            }
        })
    }
    runways.sort((a, b) => {
        return b.headWind - a.headWind
    })
    return [runways, airportData]
}

export default UseAirport;