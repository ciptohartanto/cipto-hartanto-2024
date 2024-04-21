import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Urbanist } from 'next/font/google'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

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
  const [shouldDisplayContent, setShouldDisplayContent] = useState(true)

  const { isMobile } = useWindowWidth()

  const router = useRouter()

  useEffect(() => {
    const displaySetTrue = () => {
      setShouldDisplayContent(true)
    }
    const displaySetFalse = () => {
      setShouldDisplayContent(false)
    }

    router.events.on('routeChangeStart', displaySetFalse)
    router.events.on('routeChangeComplete', displaySetTrue)

    return () => {
      router.events.off('routeChangeStart', displaySetFalse)
      router.events.off('routeChangeComplete', displaySetTrue)
    }
  }, [router])

  return (
    <AnimatePresence mode="wait">
      {shouldDisplayContent && (
        <>
          {isMobile !== undefined && (
            <>
              <div className="layout-curtain" />
              <motion.div
                className="layout-background"
                initial="hide"
                animate="animate"
                exit="hide"
                variants={{
                  hide: {
                    width: '100vw',
                    transition: { duration: 0.3 },
                  },
                  animate: {
                    width: isMobile
                      ? 'calc(100vw - 20px)'
                      : 'calc(100vw - 70px)',
                    transition: { duration: 1.3 },
                  },
                }}
              />
              <motion.div
                className={classNames('layout-wrapper', urbanist.className)}
                initial="hide"
                animate="animate"
                exit="hide"
                variants={{
                  hide: {
                    opacity: 0,
                    y: 10,
                    scale: isMobile ? 0.98 : 0.95,
                    transition: { duration: 0.3 },
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <Nav />
                {children}
              </motion.div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
