import React, {useContext, useEffect, useState} from 'react';
import fetchData from "@/hooks/fetchData";
import {ContextApp} from "@/context/context";

function Form(props) {

    const [icao, setIcao] = useState("")
    const [errorArpt, setErrorArpt] = useState(false)
    const [errorMetar, setErrorMetar] = useState(false)
    const [, , setAirportData, setMetar] = useContext(ContextApp)

    const fetchAirport = fetchData({
        setAirport: setAirportData,
        setMetar: setMetar,
        setErrorArpt: setErrorArpt,
        setErrorMetar: setErrorMetar,
    })

    const handleInput = (event: React.ChangeEvent) => {
        setIcao((event.target as HTMLInputElement).value)
    }

    useEffect(() => {
        const fetchMetar = async () => {
            if (icao.length === 4) {
                await fetchAirport(icao)
                props.onSubmit(icao)
            }
        }
        fetchMetar()
    }, [icao])

    return (
        <>
            <h1 className="font-normal">
                Get METAR and more about the airport
            </h1>
            {
                errorArpt &&
                <div>
                    <h6>{errorArpt.response.data}</h6>
                </div>
            }
            <input maxLength={4} value={icao} onChange={handleInput} className="p-2.5 border mt-7"
                   placeholder="Enter ICAO"/>
        </>
    );
}

export default Form;