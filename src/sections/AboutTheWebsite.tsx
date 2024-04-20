import { motion } from 'framer-motion'
import { useMemo } from 'react'

import SubSection from '@/components/SubSection'
import { FRAMER_SUB_SECTION_ANIMATION_BOTTOM } from '@/constants/framerAnimations'
import { SectionAbout } from '@/gql/graphql'

type AboutThisWebsiteProps = {
  componentData: Pick<SectionAbout, 'title' | 'listOfIngredients'>
}

export default function AboutTheWebsite({
  componentData,
}: AboutThisWebsiteProps) {
  const { title, listOfIngredients } = componentData

  const memoIngredients = useMemo(() => {
    // add new id
    const arrayWithNewId = listOfIngredients.map((item, idx) => ({
      ...item,
      id: String(idx + 1),
    }))

    /*
     ref: https://medium.com/@drdDavi/split-a-javascript-array-into-chunks-d90c90de3a2d
    */

    const chunkSize = 3
    const splitIngredients = []

    for (let i = 0; i < arrayWithNewId.length; i += chunkSize) {
      const chunk = arrayWithNewId.slice(i, i + chunkSize)

      splitIngredients.push(chunk)
    }

    return splitIngredients
  }, [listOfIngredients])

  return (
    <section className="aboutTheWebsite" id="about">
      <motion.h2
        className="aboutTheWebsite-title"
        {...FRAMER_SUB_SECTION_ANIMATION_BOTTOM}
      >
        {title}
      </motion.h2>
      <div className="aboutTheWebsite-wrapperContent">
        {memoIngredients.map((list, idx) => (
          <ul key={`${idx}${list}`} className="aboutTheWebsite-wrapperList">
            {list.map((item) => (
              <motion.li
                key={item.id}
                className="aboutTheWebsite-item"
                {...FRAMER_SUB_SECTION_ANIMATION_BOTTOM}
                whileInView={{
                  ...FRAMER_SUB_SECTION_ANIMATION_BOTTOM.whileInView,
                  transition: {
                    delay: 0.05 * (Number(item.id) + 1),
                  },
                }}
              >
                <SubSection title={item.title}>
                  <h3
                    className="aboutTheWebsite-subsectionText"
                    dangerouslySetInnerHTML={{ __html: item.content.html }}
                  />
                </SubSection>
              </motion.li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
