import { useEffect, useState } from 'react'

export default function useVisibilityChange() {
  const [isWindowVisible, setIsWindowVisible] = useState<undefined | boolean>(
    undefined
  )

  useEffect(() => {
    const updateIsWindowVisible = () => {
      setIsWindowVisible(document.visibilityState === 'visible')
    }
    updateIsWindowVisible()
    document.addEventListener('visibilitychange', updateIsWindowVisible)

    return () =>
      document.removeEventListener('visibilitychange', updateIsWindowVisible)
  }, [])
  return isWindowVisible
}
