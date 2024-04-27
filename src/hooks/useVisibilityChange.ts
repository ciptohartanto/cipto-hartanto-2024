import { useEffect, useState } from 'react'

export default function useVisibilityChange() {
  const [isWindowVisible, setIsWindowVisible] = useState(false)

  useEffect(() => {
    const updateIsWindowVisible = () => {
      setIsWindowVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', updateIsWindowVisible)

    return () =>
      document.removeEventListener('visibilitychange', updateIsWindowVisible)
  }, [])
  return isWindowVisible
}
