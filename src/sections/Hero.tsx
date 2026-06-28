import { motion } from 'framer-motion'
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

const TYPE_CHARACTER_INTERVAL = 80

export default function Hero({
  componentData,
  textYearsOfExperience,
}: HeroProps) {
  const refHero = useRef<null | HTMLElement>(null)

  const [textId, setTextId] = useState(0)
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(0)

  const isWindowVisible = useVisibilityChange()

  const { subtitle, caption } = componentData

  const memoCaption = useMemo(() => {
    return textToArray(caption).sort(() => 0.5 - Math.random())
  }, [caption])

  useEffect(() => {
    setTextId((prevValue) => {
      if (memoCaption.length === 0) return 0
      if (prevValue < memoCaption.length) return prevValue
      return 0
    })
  }, [memoCaption.length])

  const memoActiveCaption = useMemo(
    () => memoCaption[textId] ?? '',
    [memoCaption, textId]
  )

  const memoTypedCaption = useMemo(() => {
    return memoActiveCaption.slice(0, visibleCharacterCount)
  }, [memoActiveCaption, visibleCharacterCount])

  useEffect(() => {
    const arrayLength = textToArray(caption).length
    const updateTextId = setInterval(() => {
      setTextId((prevValue) => {
        if (prevValue < arrayLength - 1) return prevValue + 1
        return 0
      })
    }, 6000)
    return () => clearInterval(updateTextId)
  }, [caption])

  useEffect(() => {
    setVisibleCharacterCount(0)
  }, [memoActiveCaption])

  useEffect(() => {
    if (!isWindowVisible) return
    if (visibleCharacterCount >= memoActiveCaption.length) return

    const typingTimeout = setTimeout(() => {
      setVisibleCharacterCount((prevValue) => {
        if (prevValue < memoActiveCaption.length) return prevValue + 1
        return prevValue
      })
    }, TYPE_CHARACTER_INTERVAL)

    return () => clearTimeout(typingTimeout)
  }, [isWindowVisible, memoActiveCaption, visibleCharacterCount])

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
            data-title={`${textYearsOfExperience} ${memoActiveCaption}`}
          >
            <span className="hero-captionText">{textYearsOfExperience} of</span>
            <span className="hero-captionAnimatedText">
              {isWindowVisible ? memoTypedCaption : ''}
              <span className="hero-captionCursor" aria-hidden="true">
                _
              </span>
            </span>
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
