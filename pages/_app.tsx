import '../styles/globals.css'
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="py-8 px-16">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
