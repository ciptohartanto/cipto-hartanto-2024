import classNames from 'classnames'

import Tag from '@/elements/Tag'
import { ExperienceItem as ExperienceItemDataProps } from '@/gql/graphql'

export enum ExPerienceItemTypes {
  PREVIOUS = 'previous',
  CURRENT = 'current',
}

type ExperienceItemProps = {
  type: ExPerienceItemTypes
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
          'experienceItem--previous': type === ExPerienceItemTypes.PREVIOUS,
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
          <ul className="experienceItem-tagList">
            {tags.split(',').map((text) => (
              <li className="experienceItem-tag" key={text}>
                <Tag text={text} />
              </li>
            ))}
          </ul>
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
