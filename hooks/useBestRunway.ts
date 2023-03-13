import {useEffect, useState} from 'react';
import {getAirportInfo, getMetar} from "@/requests";
import {calculateCrossWind, calculateHeadWind} from "@/components/helpers/runwayCalculator";

function UseBestRunway(icao: String) {
    const [airportData, setAirportData] = useState()
    const [metar, setMetar] = useState({})

    useEffect(() => {
        const getInfoAndMetar = async () => {
            const airport = await getAirportInfo(icao)
            const metar = await getMetar(icao)
            setAirportData(airport.data)
            setMetar(metar.data.data[0])
        }
        getInfoAndMetar()
    }, [])

    useEffect(() => {
        console.log(airportData)
        console.log(metar)

    }, [airportData, metar])

    const runways = []
    if (airportData) {

        airportData.runways.forEach(runway => {
            const he_runway_parallelWind = calculateHeadWind(metar.wind.degrees, metar.wind.speed_kts, runway.he_heading_degT)
            const runway_crossWind = calculateCrossWind(metar.wind.degrees, metar.wind.speed_kts, runway.he_heading_degT)
            const le_runway_parallelWind = -he_runway_parallelWind

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
                    tailWind: le_runway_parallelWind,
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
                    tailWind: le_runway_parallelWind,
                    crossWind: Math.round(runway_crossWind),
                    ils: runway.le_ils?.freq
                })

            } else {
                runways.push({
                    status: "Tailwind",
                    heading: runway.he_heading_degT,
                    name: runway.he_ident,
                    headWind: 0,
                    tailWind: le_runway_parallelWind,
                    crossWind: runway_crossWind,
                    ils: runway.he_ils?.freq
                })
                runways.push({
                    status: "Headwind",
                    name: runway.le_ident,
                    heading: runway.le_heading_degT,
                    headWind: le_runway_parallelWind,
                    tailWind: 0,
                    crossWind: runway_crossWind,
                    ils: runway.le_ils?.freq
                })

            }
        })
    }
    return runways
}

export default UseBestRunway;