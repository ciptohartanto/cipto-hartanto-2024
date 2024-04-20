// Import Swiper styles
import 'swiper/css'

import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { FRAMER_SUB_SECTION_ANIMATION } from '@/constants/framerAnimations'
import Tag from '@/elements/Tag'
import { SectionProject } from '@/gql/graphql'

type ProjectsProps = {
  handleClick: (val: boolean) => void
  handleUpdatePopupData: (val: number) => void
  componentData: Pick<SectionProject, 'title' | 'listOfProjects'>
}

export default function Projects({
  handleClick,
  componentData,
  handleUpdatePopupData,
}: ProjectsProps) {
  const [currentSlideId, setCurrentSlideId] = useState(0)

  const { title, listOfProjects } = componentData
  const totalSlides = listOfProjects.length

  return (
    <section className="projects" id="projects">
      <div className="projects-wrapper">
        <motion.h3 className="projects-title" {...FRAMER_SUB_SECTION_ANIMATION}>
          {title}
        </motion.h3>
        <motion.div
          className="projects-swiperWrapper"
          {...FRAMER_SUB_SECTION_ANIMATION}
          viewport={{ margin: '-300px 0px 0px 0px' }}
        >
          <Swiper
            wrapperTag="ul"
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{ 850: { slidesPerView: 1.7, spaceBetween: 32 } }}
            className="projects-swiperModule"
            autoplay
            loop
            modules={[Autoplay]}
            onSlideChange={(swiper) => {
              setCurrentSlideId(swiper.realIndex + 1)
            }}
          >
            {listOfProjects.map((item, id) => (
              <SwiperSlide
                key={item.title}
                tag="li"
                className="projects-swiperSlide"
              >
                {({ isActive }) => (
                  <div
                    className={classNames('projects-swiperContentWrapper', {
                      'projects-swiperContentWrapper--active': isActive,
                    })}
                    onClick={() => {
                      if (isActive) {
                        handleClick(true)
                        handleUpdatePopupData(id)
                      }
                    }}
                  >
                    <div
                      className="projects-swiperThumbnail"
                      style={{ backgroundImage: `url(${item.thumbnail.url})` }}
                    />
                    <div className="projects-swiperTextWrapper">
                      <h3 className="projects-swiperTitle">{item.title}</h3>
                      <span className="projects-swiperDate">{item.date}</span>
                      <ul className="projects-swiperTags">
                        {item.tags.split(',').map((tagText) => (
                          <li className="projects-swiperTag" key={tagText}>
                            <Tag text={tagText} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          className="projects-counter"
          {...FRAMER_SUB_SECTION_ANIMATION}
          initial={{ x: 40, opacity: 0 }}
        >
          <span className="projects-counterText">
            {currentSlideId}/{totalSlides}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
