import '../styles/index.scss'

import { ReactLenis } from '@studio-freight/react-lenis'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactLenis root>
      <Component {...pageProps} />
    </ReactLenis>
  )
}
