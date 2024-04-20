import { motion } from 'framer-motion'
import { useMemo } from 'react'

import Tag from '@/elements/Tag'
import { Writing } from '@/gql/graphql'
import formatDate from '@/utils/formatDate'

interface ArticleItemProps {
  componentData: Pick<Writing, 'title' | 'publishTime' | 'tags'>
}

export default function ArticleItem({ componentData }: ArticleItemProps) {
  const { title, tags, publishTime } = componentData

  const memoArticleTitle = useMemo(() => {
    const wholeTitleArray = title.trim().split(' ')
    const titleLength = wholeTitleArray.length
    const lastWord = wholeTitleArray[titleLength - 1]
    return (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: `<span class="articleItem-title">${wholeTitleArray.splice(0, titleLength - 1).join(' ')}<!-- --> <span class='articleItem-title--last'>${lastWord}<span class="articleItem-iconArrow"></span></span>`,
          }}
        />
      </>
    )
  }, [title])
  return (
    <motion.div className="articleItem" whileHover={{ x: 10, opacity: 1 }}>
      {memoArticleTitle}
      <span className="articleItem-date">{formatDate(publishTime)}</span>
      <ul className="articleItem-tagList">
        {tags.split(',').map((text) => (
          <li key={text} className="articleItem-tagItem">
            <Tag text={text} />
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
