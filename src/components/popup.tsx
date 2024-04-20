import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

import IconX, { IconXTypes } from '@/elements/IconX'
import Tag from '@/elements/Tag'
import { ProjectItem } from '@/gql/graphql'

import AnchorLink from './AnchorLink'
import MarkdownProcessor from './MarkdownProcessor'

export type PopupContentProp = {
  componentData: Pick<
    ProjectItem,
    'title' | 'tags' | 'thumbnail' | 'date' | 'content' | 'projectUrl'
  >
}
type PopupProps = {
  handleClick: (val: boolean) => void
  shouldDisplayPopup: boolean
} & PopupContentProp

export default function Popup({
  handleClick,
  shouldDisplayPopup,
  componentData,
}: PopupProps) {
  const {
    title,
    thumbnail,
    tags,
    date,
    content: popupContent,
    projectUrl,
  } = componentData

  useEffect(() => {
    if (shouldDisplayPopup) document.body.classList.add('bodyLock')
    else document.body.classList.remove('bodyLock')
  }, [shouldDisplayPopup])

  return (
    <AnimatePresence>
      {shouldDisplayPopup && (
        <motion.div
          className="popup"
          initial="hide"
          animate="animate"
          exit="hide"
          variants={{
            hide: { opacity: 0, scale: 0.96 },
            animate: { opacity: 1, scale: 1 },
          }}
        >
          <div className="popup-wrapper">
            <div className="popup-iconClose" onClick={() => handleClick(false)}>
              <IconX type={IconXTypes.SMALL} />
            </div>
            <motion.div
              className="popup-body"
              initial="hide"
              animate="animate"
              exit="hide"
              variants={{
                hide: { boxShadow: '0 3px 0px 0px rgba(0,0,0,0.0)' },
                animate: {
                  boxShadow: '0 3px 17.8px 3px rgba(0,0,0,0.07)',
                  transition: { delay: 0.5, duration: 0.5 },
                },
              }}
            >
              <div className="popup-row">
                <div
                  className="popup-background"
                  style={{
                    backgroundImage: `url(${thumbnail.url})`,
                  }}
                />
                <div className="popup-content" data-lenis-prevent>
                  <h3 className="popup-title">{title}</h3>
                  <ul className="popup-wrapperTags">
                    {tags.split(',').map((text) => (
                      <li key={text} className="popup-tag">
                        <Tag text={text} />
                      </li>
                    ))}
                  </ul>
                  <div className="popup-wrapperDescription">
                    <span className="popup-description">{date}</span>
                    <AnchorLink href={projectUrl}>
                      <span className="popup-externalLink">{projectUrl}</span>
                    </AnchorLink>
                  </div>

                  <div className="popup-story">
                    <MarkdownProcessor mdContent={popupContent} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
