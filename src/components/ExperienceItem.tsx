import classNames from 'classnames'

import { ExperienceItem as ExperienceItemDataProps } from '@/gql/graphql'

import TagList from './TagList'

export enum ExperienceItemTypes {
  PREVIOUS = 'previous',
  CURRENT = 'current',
}

type ExperienceItemProps = {
  type: ExperienceItemTypes
  isLastItem: boolean
  componentData: ExperienceItemDataProps
}

export default function ExperienceItem({
  type,
  isLastItem,
  componentData,
}: ExperienceItemProps) {
  const { title, date, tags, content, links, location, position } =
    componentData
  return (
    <div
      className={classNames(
        'experienceItem',
        {
          'experienceItem--previous': type === ExperienceItemTypes.PREVIOUS,
        },
        { 'experienceItem--lastItem': isLastItem }
      )}
    >
      <div className="experienceItem-wrapperLeft">
        <span className="experienceItem-bullet" />
      </div>
      <div className="experienceItem-wrapperRight">
        <h3 className="experienceItem-title">{title}</h3>
        <span className="experienceItem-position">{position}</span>
        <span className="experienceItem-date">
          {location} | {date}
        </span>
        {tags && (
          <TagList
            customListCSS="experienceItem-tagList"
            customItemCss="experienceItem-tag"
            tagArrayText={tags}
          />
        )}
        <div
          className="experienceItem-content"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
        <div className="experienceItem-wrapperLinks">
          {links && <div dangerouslySetInnerHTML={{ __html: links.html }} />}
        </div>
      </div>
    </div>
  )
}
