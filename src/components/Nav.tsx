import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { NAV_SUB_LINKS } from '@/constants/project'
import IconHamburger, { IconHamburgerTypes } from '@/elements/IconHamburger'
import IconX, { IconXTypes } from '@/elements/IconX'

import AnchorLink from './AnchorLink'

export default function Nav() {
  const [isFolded, setIsFolded] = useState(true)

  return (
    <AnimatePresence>
      <motion.div
        className="nav"
        initial="hide"
        animate="animate"
        exit="hide"
        transition={{ type: 'tween' }}
        variants={{
          hide: {
            opacity: 0,
            x: 20,
          },
          animate: {
            opacity: 1,
            x: 0,
            transition: { delay: 3, duration: 0.2 },
          },
        }}
      >
        <button onClick={() => setIsFolded(!isFolded)} className="nav-icon">
          {/* display IconHamburger when isFolded */}
          <span className="nav-iconWrapper">
            <IconHamburger
              isActive={isFolded}
              type={IconHamburgerTypes.LARGE}
            />
          </span>

          {/* display IconHamburger when !isFolded */}
          <span className="nav-iconWrapper">
            <IconX isActive={!isFolded} type={IconXTypes.LARGE} />
          </span>
        </button>
        <AnimatePresence>
          {!isFolded && (
            <motion.div
              className="nav-wrapper"
              initial="hide"
              animate="animate"
              exit="hide"
              transition={{ type: 'tween' }}
              variants={{
                hide: {
                  opacity: 0,
                  x: '100%',
                },
                animate: {
                  opacity: 1,
                  x: 0,
                },
              }}
            >
              <motion.nav
                className="nav-navigation"
                initial="hide"
                animate="animate"
                transition={{ type: 'tween', delay: 0.7, duration: 0.6 }}
                variants={{
                  hide: {
                    filter: 'drop-shadow(0px 0 40px rgba(0,0,0,0))',
                  },
                  animate: {
                    filter: 'drop-shadow(-35px 0 40px rgba(0,0,0,0.05))',
                  },
                }}
              >
                <ul className="nav-list">
                  {NAV_SUB_LINKS.map((item, idx) => (
                    <motion.li
                      key={item.text}
                      className="nav-item"
                      initial="hide"
                      animate="animate"
                      transition={{ type: 'tween' }}
                      whileHover={{
                        x: 10,
                        transition: { delay: 0, duration: 0.2 },
                      }}
                      variants={{
                        hide: {
                          opacity: 0,
                          filter: 'blur(2px)',
                          y: -10,
                        },
                        animate: {
                          opacity: 1,
                          filter: 'blur(0px)',
                          y: 0,
                          transition: {
                            delay: 0.285 * (idx + 1),
                            duration: 0.3,
                          },
                        },
                      }}
                      onClick={() => setIsFolded(true)}
                    >
                      <AnchorLink href={item.link}>
                        <span className="nav-text">{item.text}</span>
                      </AnchorLink>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
