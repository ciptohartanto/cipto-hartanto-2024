import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import AnchorLink from '@/components/AnchorLink'
import { FRAMER_SUB_SECTION_ANIMATION } from '@/constants/framerAnimations'
import Trademark from '@/elements/Trademark'
import { SectionHero } from '@/gql/graphql'

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

  const { subtitle } = componentData

  const TEST =
    'building websites with modular markup and SCSS, creating beautiful landing pages, web development with excellent communication skills, working with international clients, being humble and delivering excellent work'

  useEffect(() => {
    const arrayLength = TEST.split(',').length
    const updateTextId = setInterval(() => {
      setTextId((prevValue) => {
        if (prevValue < arrayLength - 1) return prevValue + 1
        return 0
      })
    }, 5000)
    return () => clearTimeout(updateTextId)
  }, [])

  return (
    <section className="hero" ref={refHero}>
      <div className="hero-row">
        <div className="hero-colWrapper">
          <Trademark />
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
          >
            {textYearsOfExperience} of
            <motion.div>
              {TEST.split(',').sort(() => 0.5 - Math.random())[textId]}
            </motion.div>
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
