import React from 'react';
import Head from "next/head";
import {getAirportInfo, getMetar} from "@/requests";

export default function Airport({info: {name, runways, ...props}, date, windSpeed, windDegrees, temperature, rawText, qnh}) {
    console.log(runways)
    console.log(props)
    return (
        <>
            <Head>
                <title>{name}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <main>
                <div>
                    <div className="h-screen flex justify-center items-center animate__animated animate__fadeIn ">
                        <div>
                            <div className="">
                                <h1 className="font-bold">{props.icao_code}</h1>
                                <h1 className="font-bold">{name}</h1>
                                <h2>Elevation: {props.elevation_ft} ft</h2>
                            </div>
                            <div className="mt-4">
                                <h2 className="font-bold">Last METAR</h2>
                                <h2>{rawText}</h2>
                            </div>
                            <div className="mt-4">
                                <h2 className="font-bold">Date: {date}</h2>
                                <h2><span className="font-bold">Temperature</span>: {temperature} °C</h2>
                                <h2><span className="font-bold">Wind</span>:
                                    {windSpeed ?
                                        (
                                            <span>{windDegrees}° {windSpeed} kts</span>
                                        ):
                                        "No"
                                    }
                                </h2>
                                <h2><span className="font-bold">QNH</span>: {qnh}</h2>
                            </div>
                            <div className="mt-4">
                                <h2 className="font-bold">Runways</h2>
                                <div className="flex">
                                    {
                                        runways && runways.map((runway, index: number) =>
                                            <React.Fragment key={index}>
                                                <div className="pr-8">
                                                    <div className="flex justify-between items-center">
                                                        <h2 className="px-4 py-2 bg-green border">{runway.he_ident}</h2>
                                                        <h2>wind</h2>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="pr-14">Heading</h3>
                                                        <h3>{runway.he_heading_degT}</h3>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="pr-14">Length </h3>
                                                        <h3>{Math.floor(parseInt(runway.length_ft)*0.3)}m</h3>
                                                    </div>

                                                </div>
                                                <div className="pr-8">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="px-4 py-2 bg-green border">{runway.le_ident}</h3>
                                                        <h3>wind</h3>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="pr-14">Heading </h3>
                                                        <h3>{runway.le_heading_degT}</h3>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="pr-14">Length </h3>
                                                        <h3>{Math.floor(parseInt(runway.length_ft)*0.3)}m</h3>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    }
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const {icao} = context.query
    const {data} = await getAirportInfo(icao)
    const metar = await getMetar(icao)
    console.log(metar.data.data[0])
    return {
        props: {
            info: data,
            date: new Date(metar.data.data[0].observed + "Z").toUTCString(),
            windSpeed: metar.data.data[0].wind?.speed_kts != undefined ? metar.data.data[0].wind.speed_kts : null,
            windDegrees: metar.data.data[0].wind?.degrees != undefined ? metar.data.data[0].wind.degrees : null,
            temperature: metar.data.data[0].temperature.celsius,
            rawText: metar.data.data[0].raw_text,
            qnh: metar.data.data[0].barometer.hpa,

        }
    }

}
