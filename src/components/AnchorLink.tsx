import Link from 'next/link'
import { ReactNode, useMemo } from 'react'

import { KEYWORD_HTTP } from '@/constants/project'

interface AnchorLinkProps {
  href: string
  children: ReactNode
}

export default function AnchorLink({ href, children }: AnchorLinkProps) {
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
    <Link href={href} {...parsedLinkAttrs}>
      {children}
    </Link>
  )
}
