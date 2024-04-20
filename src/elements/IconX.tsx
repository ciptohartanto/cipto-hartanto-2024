import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'

export enum IconXTypes {
  LARGE = 'large',
  LIGHT = 'light',
  SMALL = 'small',
}

interface IconXProps {
  type: IconXTypes
  isActive: boolean
}

export default function IconX({ type, isActive }: IconXProps) {
  const memoLines = useMemo(() => {
    const lines = [
      { hide: { y: 5 }, animate: { y: 6, x: 0, rotate: 45 } },
      {
        hide: { y: -5 },
        animate: { y: -6.5, x: type === IconXTypes.LIGHT ? 0 : 1, rotate: -45 },
      },
    ]
    return lines
  }, [type])
  return (
    <AnimatePresence>
      {isActive && (
        <span className={classNames('iconX', `iconX--${type}`)}>
          {memoLines.map((item) => (
            <motion.span
              key={`${item.animate.x}${item.animate.y}`}
              className="iconX-line"
              initial="hide"
              animate="animate"
              exit="hide"
              transition={{ type: 'tween', delay: 0.2, duration: 0.3 }}
              variants={{
                hide: {
                  opacity: 0,
                  filter: 'blur(2px)',
                  transition: { delay: 0.2 },
                  y: item.hide.y,
                  rotate: 0,
                },
                animate: {
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: item.animate.y,
                  x: item.animate.x,
                  rotate: item.animate.rotate,
                },
              }}
            />
          ))}
        </span>
      )}
    </AnimatePresence>
  )
}

IconX.defaultProps = {
  isActive: true,
  type: IconXTypes.LARGE,
}
