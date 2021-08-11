import '../styles/globals.css'
import { AppProps } from "next/app";
import { AuthProvider } from '../auth/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="py-8 px-16">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  )
}

export default MyApp
