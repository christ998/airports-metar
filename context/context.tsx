import {createContext, useState} from "react";

export const ContextApp = createContext(null)

function AirportContextProvider({ children }) {
    const [airportData, setAirportData] = useState(null)
    const [metar, setMetar] = useState(null)

    return (
        <ContextApp.Provider value={[airportData, metar, setAirportData, setMetar]}>
            {children}
        </ContextApp.Provider>
    )
}


export default AirportContextProvider