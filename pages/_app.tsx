import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import AirportContextProvider from "@/context/context";

export default function App({Component, pageProps}: AppProps) {
    return (
        <AirportContextProvider>
            <Component {...pageProps} />
        </AirportContextProvider>
    )
}
