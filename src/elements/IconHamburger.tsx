import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import { UI_ICON_HAMBURGER_LINES } from '@/constants/project'

export enum IconHamburgerTypes {
  LARGE = 'large',
  SMALL = 'small',
}

interface IconHamburgerProps {
  type: IconHamburgerTypes
  isActive: boolean
}

export default function IconHamburger({ type, isActive }: IconHamburgerProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <div className={classNames('iconHamburger', `iconHamburger--${type}`)}>
          {UI_ICON_HAMBURGER_LINES.map((item) => (
            <motion.span
              key={`${item.yHide}${item.yAnimate}`}
              className="iconHamburger-line"
              initial="hide"
              animate="animate"
              exit="hide"
              transition={{ type: 'tween', delay: 0.2, duration: 0.3 }}
              variants={{
                hide: {
                  opacity: 0,
                  filter: 'blur(2px)',
                  y: item.yHide,
                  transition: { delay: 0.2 },
                },
                animate: {
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: item.yAnimate,
                },
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

IconHamburger.defaultProps = {
  type: IconHamburgerTypes.LARGE,
  isActive: true,
}
