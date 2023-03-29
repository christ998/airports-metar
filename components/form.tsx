import React, {useEffect, useState} from 'react';
import fetchData from "@/hooks/fetchData";

function Form(props) {

    const [icao, setIcao] = useState("")
    const [errorArpt, setErrorArpt] = useState(false)
    const [errorMetar, setErrorMetar] = useState(false)

    const fetchAirport = fetchData({
        setAirport: props.setAirport,
        setMetar: props.setMetar,
        setErrorArpt: setErrorArpt,
        setErrorMetar: setErrorMetar,
        onLoaded: props.setLoading
    })

    const handleInput = (event: React.ChangeEvent) => {
        setIcao((event.target as HTMLInputElement).value)
    }

    useEffect(() => {
        const fetchMetar = async () => {
            if (icao.length === 4) {
                props.setLoading(true)
                fetchAirport(icao)
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
                    <h6>{errorArpt}</h6>
                </div>
            }
            {
                errorMetar &&
                <div>
                    <h6>{errorMetar}</h6>
                </div>
            }
            <input maxLength={4} value={icao} onChange={handleInput} className="p-2.5 border mt-7"
                   placeholder="Enter ICAO"/>
        </>
    );
}

export default Form;