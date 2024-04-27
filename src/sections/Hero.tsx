import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

import AnchorLink from '@/components/AnchorLink'
import { FRAMER_SUB_SECTION_ANIMATION } from '@/constants/framerAnimations'
import Trademark from '@/elements/Trademark'
import { SectionHero } from '@/gql/graphql'
import useVisibilityChange from '@/hooks/useVisibilityChange'
import textToArray from '@/utils/textToArray'

type HeroProps = {
  componentData: Pick<SectionHero, 'subtitle' | 'caption'>
  textYearsOfExperience: string
}

export default function Hero({
  componentData,
  textYearsOfExperience,
}: HeroProps) {
  const refHero = useRef<null | HTMLElement>(null)

  const [textId, setTextId] = useState(0)

  const isWindowVisible = useVisibilityChange()

  const { subtitle, caption } = componentData

  const memoCaption = useMemo(() => {
    return textToArray(caption).sort(() => 0.5 - Math.random())
  }, [caption])

  const memoCaptionCharacterArray = useMemo(() => {
    return memoCaption[textId].trim().split('')
  }, [memoCaption, textId])

  useEffect(() => {
    const arrayLength = textToArray(caption).length
    const updateTextId = setInterval(() => {
      setTextId((prevValue) => {
        if (prevValue < arrayLength - 1) return prevValue + 1
        return 0
      })
    }, 6000)
    return () => clearTimeout(updateTextId)
  }, [caption])

  return (
    <section className="hero" ref={refHero}>
      <div className="hero-row">
        <div className="hero-colWrapper">
          <AnchorLink
            gaContent={{
              event: 'clickedNavItem',
              value: 'stayed',
            }}
            href="./"
          >
            <Trademark />
          </AnchorLink>
          <motion.h2
            className="hero-subtitle"
            {...FRAMER_SUB_SECTION_ANIMATION}
            whileInView={{
              ...FRAMER_SUB_SECTION_ANIMATION.whileInView,
              transition: {
                delay: 0.2,
              },
            }}
            viewport={{ ...FRAMER_SUB_SECTION_ANIMATION.viewport, once: false }}
          >
            {subtitle}
          </motion.h2>
          <motion.h3
            className="hero-caption"
            {...FRAMER_SUB_SECTION_ANIMATION}
            whileInView={{
              ...FRAMER_SUB_SECTION_ANIMATION.whileInView,
              transition: {
                delay: 0.5,
              },
            }}
            viewport={{ ...FRAMER_SUB_SECTION_ANIMATION.viewport, once: false }}
            data-title={`${textYearsOfExperience} ${memoCaption[textId]}`}
          >
            <span>{textYearsOfExperience} of</span>
            &nbsp;
            <AnimatePresence mode="wait">
              {isWindowVisible &&
                memoCaptionCharacterArray.map((item, idx) => (
                  <motion.span
                    key={`${textId}${item}${idx}`}
                    initial={{
                      y: 5,
                      opacity: 0,
                      height: 0,
                      filter: 'blur(1px)',
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: { delay: 0.02 * idx + 1 },
                      height: 'auto',
                      filter: 'blur(0)',
                    }}
                    exit={{
                      y: -8,
                      opacity: 0,
                      transition: {
                        delay: 0.01 * (memoCaptionCharacterArray.length - idx),
                      },
                      filter: 'blur(1.3px)',
                      height: 0,
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
            </AnimatePresence>
          </motion.h3>
          <AnchorLink
            href="/resume"
            gaContent={{
              event: 'clickedHeroCta',
              value: 'Checking out Resume page.',
            }}
          >
            <motion.span
              className="hero-link"
              {...FRAMER_SUB_SECTION_ANIMATION}
              whileInView={{
                ...FRAMER_SUB_SECTION_ANIMATION.whileInView,
                transition: {
                  delay: 0.7,
                },
              }}
              viewport={{
                ...FRAMER_SUB_SECTION_ANIMATION.viewport,
                once: false,
              }}
            >
              Read More
            </motion.span>
          </AnchorLink>
        </div>
      </div>
    </section>
  )
}
