// Import Swiper styles
import 'swiper/css'

import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Tag from '@/elements/Tag'
import { SectionProject } from '@/gql/graphql'

type ProjectsProps = {
  handleClick: (val: boolean) => void
  handleUpdatePopupData: (val: number) => void
  componentData: Pick<SectionProject, 'title' | 'listOfProjects'>
}

type CustomFramerProps = {
  idx: number
  afterXPos: number
}

export default function Projects({
  handleClick,
  componentData,
  handleUpdatePopupData,
}: ProjectsProps) {
  const [currentSlideId, setCurrentSlideId] = useState(0)
  const [swipeToLeft, setSwipeToLeft] = useState<boolean | undefined>(undefined)

  const { title, listOfProjects } = componentData
  const totalSlides = listOfProjects.length

  const memoVariants = useMemo(() => {
    const animateVariants = {
      show: (custom: CustomFramerProps) => {
        return {
          x: 0,
          opacity: 1,
          transition: {
            delay: 0.2 * (custom.idx + 1),
            duration: 0.5,
          },
        }
      },
      hide: (custom: CustomFramerProps) => {
        return {
          x: swipeToLeft ? custom.afterXPos : -custom.afterXPos,
          opacity: 0,
        }
      },
    }

    return animateVariants
  }, [swipeToLeft])

  return (
    <section className="projects" id="projects">
      <div className="projects-wrapper">
        <h3 className="projects-title">{title}</h3>
        <div className="projects-swiperWrapper">
          <Swiper
            wrapperTag="ul"
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{ 850: { slidesPerView: 1.7, spaceBetween: 32 } }}
            className="projects-swiperModule"
            threshold={140}
            speed={300}
            autoplay
            loop
            modules={[Autoplay]}
            onSlideChange={(swiper) => {
              setCurrentSlideId(swiper.realIndex + 1)
            }}
            onSlideNextTransitionStart={() => {
              setSwipeToLeft(true)
            }}
            onProgress={(swiper) => {
              let swipingLeft
              if (swiper.touches.diff === 0) {
                swipingLeft = true
              } else if (swiper.touches.diff <= -140) {
                swipingLeft = true
              } else {
                swipingLeft = false
              }

              setSwipeToLeft(swipingLeft)
            }}
          >
            {listOfProjects.map((item, id) => (
              <SwiperSlide
                key={item.title}
                tag="li"
                className="projects-swiperSlide"
              >
                {({ isActive }) => (
                  <motion.div
                    className={classNames('projects-swiperContentWrapper', {
                      'projects-swiperContentWrapper--active': isActive,
                    })}
                    onClick={() => {
                      if (isActive) {
                        handleClick(true)
                        handleUpdatePopupData(id)
                      }
                    }}
                    whileHover={
                      isActive
                        ? {
                            cursor: 'pointer',
                            scale: 0.995,
                            transition: { duration: 0.3 },
                          }
                        : undefined
                    }
                  >
                    <motion.div
                      className="projects-swiperThumbnail"
                      style={{ backgroundImage: `url(${item.thumbnail.url})` }}
                      variants={{
                        active: {
                          paddingTop: `${(415 / 622) * 100}%`,
                          filter: 'blur(0)',
                        },
                        inactive: {
                          paddingTop: `${(470 / 622) * 100}%`,
                          filter: 'blur(1px)',
                        },
                      }}
                      animate={isActive ? 'active' : 'inactive'}
                    />
                    <div className="projects-swiperTextWrapper">
                      <motion.h3
                        className="projects-swiperTitle"
                        animate={isActive ? 'show' : 'hide'}
                        variants={memoVariants}
                        custom={{
                          idx: 0,
                          afterXPos: 25,
                        }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.span
                        className="projects-swiperDate"
                        animate={isActive ? 'show' : 'hide'}
                        variants={memoVariants}
                        custom={{
                          idx: 1,
                          afterXPos: 45,
                        }}
                      >
                        {item.date}
                      </motion.span>
                      <ul className="projects-swiperTags">
                        {item.tags.split(',').map((tagText, idx) => (
                          <motion.li
                            className="projects-swiperTag"
                            key={tagText}
                            animate={isActive ? 'show' : 'hide'}
                            variants={memoVariants}
                            custom={{
                              idx,
                              afterXPos: 55,
                            }}
                          >
                            <Tag text={tagText} />
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="projects-counter">
          <span className="projects-counterText">
            {currentSlideId}/{totalSlides}
          </span>
        </div>
      </div>
    </section>
  )
}
