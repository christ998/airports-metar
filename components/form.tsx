import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

function Form() {

    const [icao, setIcao] = useState("")
    const router = useRouter()

    const handleInput = (event: React.ChangeEvent) => {
        setIcao((event.target as HTMLInputElement).value)
    }

    useEffect(() => {
        const fetchMetar = async () => {
            if (icao.length === 4) {
                router.push(`/airport/${icao}`)
            }
        }
        fetchMetar()
    }, [icao])

    return (
        <>
            <h1 className="font-normal">
                Get METAR and more about the airport
            </h1>
            <input maxLength={4} value={icao} onChange={handleInput} className="p-2.5 border mt-7"
                   placeholder="Enter ICAO"/>
        </>
    );
}

export default Form;