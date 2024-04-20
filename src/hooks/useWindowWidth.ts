import { useEffect, useState } from 'react'

import { BREAKPOINT_DESKTOP } from '@/constants/project'

export default function useWindowWidth(): { isMobile: undefined | boolean } {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const computeIsMobile = () => {
      if (isMobile === undefined && window) {
        const width = window.innerWidth

        const isMobileWidth = width < BREAKPOINT_DESKTOP
        setIsMobile(isMobileWidth)
      }
    }
    computeIsMobile()
  }, [isMobile])

  return { isMobile }
}
