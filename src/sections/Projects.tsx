// Import Swiper styles
import 'swiper/css'

import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Tag from '@/elements/Tag'
import { SectionProject } from '@/gql/graphql'
import textToArray from '@/utils/textToArray'

type ProjectsProps = {
  handleClick: (val: boolean) => void
  handleUpdatePopupData: (val: number) => void
  componentData: Pick<SectionProject, 'title' | 'listOfProjects'>
}

type CustomFramerProps = {
  idx: number
  afterXPos: number
}

type CustomTagFramerProps = {
  idx: number
  total: number
  afterXPos: number
}

const ACTIVE_THUMBNAIL_PADDING_TOP = (415 / 622) * 100
const INACTIVE_THUMBNAIL_PADDING_TOP = (470 / 622) * 100
const THUMBNAIL_PADDING_TOP = 66.7203
const MAX_VISIBLE_STACK = 4
const STACK_RANGE = {
  xStart: -150,
  xEnd: -26,
  yStart: 0,
  yEnd: -235,
  scaleStart: 0.7,
  scaleStep: 0.01,
  skewStart: 1.2,
  skewStep: -1.2,
} as const
const DRAG_SWIPE_THRESHOLD = 70
const AUTOPLAY_DELAY = 420000
const LAST_SENTINEL_SCALE_DELTA = 0.03

function getSlideDirection({
  current,
  previous,
  total,
}: {
  current: number
  previous: number
  total: number
}) {
  if (current === previous || total <= 1) return 'next'

  const forwardDistance = (current - previous + total) % total
  const backwardDistance = (previous - current + total) % total

  return forwardDistance <= backwardDistance ? 'next' : 'prev'
}

function updateSlideZoom(swiper: {
  slides: ArrayLike<HTMLElement & { progress?: number }>
}) {
  Array.from(swiper.slides).forEach((slideNode) => {
    const progress = Math.min(Math.abs(slideNode.progress ?? 0), 1)
    const focus = 1 - progress
    const paddingTop =
      ACTIVE_THUMBNAIL_PADDING_TOP +
      (INACTIVE_THUMBNAIL_PADDING_TOP - ACTIVE_THUMBNAIL_PADDING_TOP) * progress

    slideNode.style.setProperty('--projects-slide-focus', String(focus))

    const thumbnailNode = slideNode.querySelector<HTMLElement>(
      '.projects-swiperThumbnail'
    )

    if (thumbnailNode) {
      thumbnailNode.style.paddingTop = `${paddingTop}%`
    }
  })
}

function createStackLayout(slotIndex: number, visibleCount: number) {
  const lastSlot = Math.max(1, visibleCount - 1)
  const progress = slotIndex / lastSlot
  const easedProgress = 1 - Math.pow(1 - progress, 1.35)

  return {
    x:
      STACK_RANGE.xStart +
      (STACK_RANGE.xEnd - STACK_RANGE.xStart) * easedProgress,
    y:
      STACK_RANGE.yStart +
      (STACK_RANGE.yEnd - STACK_RANGE.yStart) * easedProgress,
    scale: STACK_RANGE.scaleStart + STACK_RANGE.scaleStep * slotIndex,
    skewY: STACK_RANGE.skewStart + STACK_RANGE.skewStep * slotIndex,
    zIndex: MAX_VISIBLE_STACK - slotIndex,
  }
}

function createTrackLayout(trackSlot: number, visibleCount: number) {
  if (trackSlot < 0) {
    const frontLayout = createStackLayout(0, visibleCount)

    return {
      ...frontLayout,
      x: frontLayout.x - 44,
      y: frontLayout.y + 12,
      scale: 0.5,
      skewY: frontLayout.skewY + 0.5,
      opacity: 0,
    }
  }

  if (trackSlot > visibleCount - 1) {
    const backLayout = createStackLayout(visibleCount - 1, visibleCount)

    return {
      ...backLayout,
      x: backLayout.x + 24,
      y: backLayout.y - 22,
      scale: Math.max(0.1, backLayout.scale - LAST_SENTINEL_SCALE_DELTA),
      skewY: backLayout.skewY - 0.4,
      zIndex: 0,
      opacity: 0,
    }
  }

  return {
    ...createStackLayout(trackSlot, visibleCount),
    opacity: 1,
  }
}

function normalizeIndex(index: number, total: number) {
  if (total === 0) return 0
  return (index + total) % total
}

export default function Projects({
  handleClick,
  componentData,
  handleUpdatePopupData,
}: ProjectsProps) {
  const [windowBaseIndex, setWindowBaseIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [currentSlideId, setCurrentSlideId] = useState(1)
  const [isDraggingSlide, setIsDraggingSlide] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next')
  const [directionAnimationVersion, setDirectionAnimationVersion] = useState(0)
  const previousRealIndexRef = useRef(0)

  const { title, listOfProjects } = componentData
  const totalSlides = listOfProjects.length
  const visibleCount = Math.min(totalSlides, MAX_VISIBLE_STACK)
  const trackLength = totalSlides * 3

  useEffect(() => {
    if (totalSlides === 0) {
      setWindowBaseIndex(0)
      return
    }

    setWindowBaseIndex(totalSlides)
  }, [totalSlides])

  const updateDirection = useCallback(
    (nextDirection: 'next' | 'prev') => {
      if (slideDirection === nextDirection) return

      setSlideDirection(nextDirection)
      setDirectionAnimationVersion((prevValue) => prevValue + 1)
    },
    [slideDirection]
  )

  const moveCarousel = useCallback(
    (nextDirection: 'next' | 'prev') => {
      if (totalSlides <= 1) return

      updateDirection(nextDirection)

      setWindowBaseIndex((prevBaseIndex) =>
        normalizeIndex(
          nextDirection === 'next' ? prevBaseIndex + 1 : prevBaseIndex - 1,
          trackLength
        )
      )
    },
    [trackLength, totalSlides, updateDirection]
  )

  useEffect(() => {
    if (isCarouselPaused || totalSlides <= 1) return

    const autoplayInterval = setInterval(() => {
      moveCarousel('next')
    }, AUTOPLAY_DELAY)

    return () => clearInterval(autoplayInterval)
  }, [isCarouselPaused, moveCarousel, totalSlides])

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
          x: slideDirection === 'next' ? custom.afterXPos : -custom.afterXPos,
          opacity: 0,
        }
      },
    }

    return animateVariants
  }, [slideDirection])

  const memoTagVariants = useMemo(() => {
    const animateVariants = {
      show: (custom: CustomTagFramerProps) => {
        return {
          x: 0,
          opacity: 1,
          transition: {
            delay: 0.16 + 0.06 * custom.idx,
            duration: 0.3,
          },
        }
      },
      hide: (custom: CustomTagFramerProps) => {
        return {
          x: slideDirection === 'next' ? custom.afterXPos : -custom.afterXPos,
          opacity: 0,
          transition: {
            delay: 0,
            duration: 0.2,
          },
        }
      },
    }

    return animateVariants
  }, [slideDirection])

  const trackSlides = useMemo(() => {
    if (totalSlides === 0 || visibleCount === 0) return []

    return Array.from({ length: trackLength }, (_, trackIndex) => {
      const sourceIndex = normalizeIndex(trackIndex, totalSlides)
      const rawOffset = normalizeIndex(
        trackIndex - windowBaseIndex,
        trackLength
      )
      const signedOffset =
        rawOffset > trackLength / 2 ? rawOffset - trackLength : rawOffset

      const trackSlot =
        signedOffset < 0
          ? -1
          : signedOffset >= visibleCount
            ? visibleCount
            : signedOffset

      return {
        item: listOfProjects[sourceIndex],
        sourceIndex,
        trackSlot,
        trackIndex,
        key: `${trackIndex}`,
      }
    })
  }, [listOfProjects, totalSlides, trackLength, visibleCount, windowBaseIndex])

  const currentSlideCounter =
    totalSlides > 0 ? normalizeIndex(windowBaseIndex, totalSlides) + 1 : 0

  return (
    <section className="projects" id="projects">
      <div className="projects-wrapper">
        <h3 className="projects-title">{title}</h3>
        <div className="projects-swiperWrapper">
          <Swiper
            wrapperTag="ul"
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{ 850: { slidesPerView: 1.5, spaceBetween: 32 } }}
            className={classNames('projects-swiperModule', {
              'projects-swiperModule--dragging': isDraggingSlide,
            })}
            speed={300}
            watchSlidesProgress
            autoplay
            loop
            modules={[Autoplay]}
            onBeforeInit={(swiper) => {
              previousRealIndexRef.current = swiper.realIndex
              updateSlideZoom(swiper)
            }}
            onProgress={(swiper) => {
              updateSlideZoom(swiper)
            }}
            onSetTranslate={(swiper) => {
              updateSlideZoom(swiper)
            }}
            onTouchStart={() => {
              setIsDraggingSlide(true)
            }}
            onTouchEnd={() => {
              setIsDraggingSlide(false)
            }}
            onSlideChange={(swiper) => {
              setCurrentSlideId(swiper.realIndex + 1)
            }}
            onSliderMove={(swiper) => {
              if (swiper.touches.diff === 0) return
              updateDirection(swiper.touches.diff < 0 ? 'next' : 'prev')
            }}
            onSlideChangeTransitionStart={(swiper) => {
              const nextDirection = getSlideDirection({
                current: swiper.realIndex,
                previous: previousRealIndexRef.current,
                total: totalSlides,
              })

              updateDirection(nextDirection)
              previousRealIndexRef.current = swiper.realIndex
            }}
          >
            {listOfProjects.map((item, id) => (
              <SwiperSlide
                key={item.title}
                tag="li"
                className="projects-swiperSlide"
              >
                {({ isActive }) =>
                  (() => {
                    const tagItems = textToArray(item.tags)

                    return (
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
                          style={{
                            backgroundImage: `url(${item.thumbnail.url})`,
                            paddingTop: `${INACTIVE_THUMBNAIL_PADDING_TOP}%`,
                          }}
                          variants={{
                            active: {
                              filter: 'blur(0)',
                            },
                            inactive: {
                              filter: 'blur(1px)',
                            },
                          }}
                          animate={isActive ? 'active' : 'inactive'}
                        />
                        <div className="projects-swiperTextWrapper">
                          <motion.h3
                            key={`title-${item.title}-${directionAnimationVersion}`}
                            className="projects-swiperTitle"
                            initial="hide"
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
                            key={`date-${item.title}-${directionAnimationVersion}`}
                            className="projects-swiperDate"
                            initial="hide"
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
                            {tagItems.map((tagText, idx) => (
                              <motion.li
                                className="projects-swiperTag"
                                key={`${tagText}-${directionAnimationVersion}`}
                                initial="hide"
                                animate={isActive ? 'show' : 'hide'}
                                variants={memoTagVariants}
                                custom={{
                                  idx,
                                  total: tagItems.length,
                                  afterXPos: 90,
                                }}
                              >
                                <Tag text={tagText} />
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )
                  })()
                }
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
