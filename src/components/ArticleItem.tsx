import { motion } from 'framer-motion'
import { useMemo } from 'react'

import { Writing } from '@/gql/graphql'
import formatDate from '@/utils/formatDate'

import TagList from './TagList'

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
      {tags && (
        <TagList
          customListCSS="articleItem-tagList"
          customItemCss="articleItem-tagItem"
          tagArrayText={tags}
        />
      )}
    </motion.div>
  )
}
