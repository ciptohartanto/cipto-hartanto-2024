import '../styles/index.scss'

import { ReactLenis } from '@studio-freight/react-lenis'
import type { AppProps } from 'next/app'

import Layout from '@/layout/Layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactLenis root>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReactLenis>
  )
}
