import React from 'react';
import Head from "next/head";
import {getAirportInfo, getMetar} from "@/requests";
import useBestRunway from "@/hooks/useBestRunway";

export default function Airport({info: {name, runways, ...props}, date, windSpeed, windDegrees, temperature, rawText, qnh}) {
    const bestRunways = useBestRunway(props.icao_code)
    const bgColour = (status) => {
        switch (status) {
            case "Headwind":
                return "bg-green"
            case "Crosswind":
                return "bg-yellow"
            default:
                return ""
        }
    }
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
                                        bestRunways.map((runway, index: number) =>
                                            <React.Fragment key={index}>
                                                <div className="pr-8">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className={`px-4 py-2 font-bold rounded-md border ${bgColour(runway.status)}`}>{runway.name}</h3>
                                                        <h3>{runway.status}</h3>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="pr-14">Heading</h3>
                                                        <h3>{runway.heading}</h3>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="pr-14">{runway.status == "Headwind" ? "Headwind": "Tailwind"}</h3>
                                                        <h3>{runway.status == "Headwind" ? runway.headWind : runway.tailWind} kts</h3>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="pr-14">Crosswind</h3>
                                                        <h3>{runway.crossWind} kts</h3>
                                                    </div>
                                                    {/*<div className="flex justify-between">*/}
                                                    {/*    <h3 className="pr-14">Length </h3>*/}
                                                    {/*    <h3>{Math.floor(parseInt(runway.length_ft)*0.3)}m</h3>*/}
                                                    {/*</div>*/}
                                                    <div className="flex justify-between">
                                                        <h3 className="pr-14">ILS</h3>
                                                        <h3>{runway.ils ? runway.ils : "No"}</h3>
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
    console.log(data)
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
