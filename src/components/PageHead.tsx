import Head from 'next/head'
import { useEffect, useState } from 'react'

import { TRADEMARK_TEXT } from '@/constants/project'
import useVisibilityChange from '@/hooks/useVisibilityChange'

interface PageHeadProps {
  pageTitle: string
  metaDescription: string
}

export default function PageHead({
  pageTitle,
  metaDescription,
}: PageHeadProps) {
  const [currentTitle, setCurrentTitle] = useState('')

  const isWindowVisible = useVisibilityChange()

  useEffect(() => {
    const desiredTitle = `${TRADEMARK_TEXT.firstLine} ${TRADEMARK_TEXT.secondLine} | ${pageTitle}`
    const updateCurrentTitle = () => {
      if (!isWindowVisible) {
        setCurrentTitle('miss you (っ◕‿◕)っ')
      } else {
        setCurrentTitle(desiredTitle)
      }
    }

    updateCurrentTitle()
  }, [pageTitle, isWindowVisible])

  return (
    <Head>
      <title>{currentTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content={metaDescription} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
    </Head>
  )
}
