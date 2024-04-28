import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { MouseEvent, useState } from 'react'

import { TRADEMARK_TEXT } from '@/constants/project'

export default function Trademark() {
  const [displayShadow, setDisplayShadow] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ['17.5deg', '-17.5deg']
  )
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ['-17.5deg', '17.5deg']
  )
  const rotateX2 = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ['18.5deg', '-18.5deg']
  )
  const rotateY2 = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ['-18.5deg', '18.5deg']
  )
  const color1 = useTransform(mouseXSpring, [-0.5, 0.5], ['#8335ff', '#e602e2'])
  const color2 = useTransform(mouseXSpring, [-0.5, 0.5], ['#9f64ff', '#ff61fc'])

  const handleMouseMove = (e: MouseEvent) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect()
    const { clientX, clientY } = e
    const mouseX = clientX - left
    const mouseY = clientY - top

    const xPct = mouseX / width - 0.5 // returns min: -0.5 and max: 0.5
    const yPct = mouseY / height - 0.5 // returns min: -0.5 and max: 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setDisplayShadow(false)
  }

  return (
    <div
      className="trademark"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setDisplayShadow(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.h1 className="trademark-wrapper" style={{ rotateX, rotateY }}>
        <span className="trademark-line1">{TRADEMARK_TEXT.firstLine}</span>

        <span className="trademark-line2">{TRADEMARK_TEXT.secondLine}</span>
      </motion.h1>
      <AnimatePresence key="shadow1">
        {displayShadow && (
          <motion.div
            className="trademark-wrapper trademark-wrapper--shadow1"
            style={{ rotateX: rotateX2, rotateY: rotateY2 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
          >
            <motion.span className="trademark-line1" style={{ color: color1 }}>
              {TRADEMARK_TEXT.firstLine}
            </motion.span>

            <motion.span className="trademark-line2" style={{ color: color1 }}>
              {TRADEMARK_TEXT.secondLine}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence key="shadow2">
        {displayShadow && (
          <motion.div
            className="trademark-wrapper trademark-wrapper--shadow2"
            style={{ rotateX: rotateX2, rotateY: rotateY2 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
          >
            <motion.span className="trademark-line1" style={{ color: color2 }}>
              {TRADEMARK_TEXT.firstLine}
            </motion.span>

            <motion.span className="trademark-line2" style={{ color: color2 }}>
              {TRADEMARK_TEXT.secondLine}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
