import '../styles/index.scss'

import { GoogleTagManager } from '@next/third-parties/google'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_ID_GA ?? ''} />
    </>
  )
}
