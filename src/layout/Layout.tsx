import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Urbanist } from 'next/font/google'
import { ReactNode } from 'react'

import Nav from '@/components/Nav'
import useWindowWidth from '@/hooks/useWindowWidth'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-urbanist',
})

export default function Layout({ children }: { children: ReactNode }) {
  const { isMobile } = useWindowWidth()

  if (isMobile === undefined) return <></>

  return (
    <>
      <motion.div
        initial="hide"
        animate="animate"
        exit="hide"
        transition={{ type: 'tween' }}
        variants={{
          hide: {
            opacity: 0,
            y: -10,
            transition: { delay: 0.3, duration: 0.2 },
          },
          animate: {
            opacity: 1,
            y: 0,
            transition: { delay: 1.3, duration: 0.6 },
          },
        }}
        className="layout-curtain"
      />
      <motion.div
        className="layout-background"
        initial="hide"
        animate="animate"
        exit="hide"
        transition={{ type: 'tween' }}
        variants={{
          hide: {
            width: '100vw',
            x: 0,
            transition: { delay: 0.3, duration: 0.2 },
          },

          animate: {
            x: isMobile ? 10 : 35,
            width: isMobile ? 'calc(100vw - 20px)' : 'calc(100vw - 70px)',

            transition: { delay: 1, duration: 0.7 },
          },
        }}
      />
      <motion.div
        className={classNames('layout-wrapper', urbanist.className)}
        initial="hide"
        animate="animate"
        exit="hide"
        transition={{ type: 'tween' }}
        variants={{
          hide: {
            opacity: 0,
            y: 20,
            transition: { delay: 0.5, duration: 0.5 },
          },

          animate: {
            opacity: 1,
            y: 0,
            transition: { delay: 2, duration: 0.8 },
          },
        }}
      >
        <Nav />

        {children}
      </motion.div>
    </>
  )
}
