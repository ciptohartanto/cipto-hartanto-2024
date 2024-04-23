import { sendGAEvent } from '@next/third-parties/google'
import Link from 'next/link'
import { ReactNode, useMemo } from 'react'

import { KEYWORD_HTTP } from '@/constants/project'

interface AnchorLinkProps {
  href: string
  children: ReactNode
  gaContent: {
    event: string
    value: string
  }
}

export default function AnchorLink({
  href,
  gaContent,
  children,
}: AnchorLinkProps) {
  const { event, value } = gaContent
  const parsedLinkAttrs = useMemo(() => {
    if (href.startsWith(KEYWORD_HTTP)) {
      return {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    } else {
      return
    }
  }, [href])

  return (
    <Link
      href={href}
      onClick={() => sendGAEvent({ event, value })}
      {...parsedLinkAttrs}
    >
      {children}
    </Link>
  )
}
