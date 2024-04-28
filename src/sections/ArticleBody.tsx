import AnchorLink from '@/components/AnchorLink'
import MarkdownProcessor from '@/components/MarkdownProcessor'
import TableOfContent from '@/components/TableOfContent'
import TagList from '@/components/TagList'
import Trademark from '@/elements/Trademark'
import { Writing } from '@/gql/graphql'
import formatDate from '@/utils/formatDate'

type ArticleNavObjectProps = {
  slug: string
  title: string
}

export type ArticleNavProps = {
  prevArticle: ArticleNavObjectProps | null
  nextArticle: ArticleNavObjectProps | null
}

export default function ArticleBody({
  componentData,
  articleNav,
}: {
  componentData: Writing
  articleNav: ArticleNavProps
}) {
  const { title, tags, publishTime, articleContent: mdContent } = componentData
  const { prevArticle, nextArticle } = articleNav

  return (
    <div className="articleBody">
      <div className="articleBody-wrapper">
        <div className="articleBody-wrapperTop">
          <Trademark />
        </div>

        <div className="articleBody-wrapperBottom">
          <div className="articleBody-wrapperBottomLeft">
            <TableOfContent />
            <ul className="articleBody-nav">
              <li className="articleBody-navItem  articleBody-navItem--main">
                <AnchorLink
                  href="../#writings"
                  gaContent={{
                    event: 'clickedArticleNav',
                    value: 'Go back to Writings section.',
                  }}
                >
                  <span className="articleBody-navLink">Writings</span>
                </AnchorLink>
              </li>
              {prevArticle && (
                <li className="articleBody-navItem articleBody-navItem--prev">
                  <AnchorLink
                    href={prevArticle?.slug}
                    gaContent={{
                      event: 'clickedArticleNav',
                      value: `Checking previous article ${prevArticle.title}.`,
                    }}
                  >
                    <span className="articleBody-navLink">
                      {prevArticle?.title}
                    </span>
                  </AnchorLink>
                </li>
              )}
              {nextArticle && (
                <li className="articleBody-navItem articleBody-navItem--next">
                  <AnchorLink
                    href={nextArticle.slug}
                    gaContent={{
                      event: 'clickedArticleNav',
                      value: `Checking next article ${nextArticle.title}.`,
                    }}
                  >
                    <span className="articleBody-navLink">
                      {nextArticle.title}
                    </span>
                  </AnchorLink>
                </li>
              )}
            </ul>
          </div>
          <div className="articleBody-wrapperSection">
            <div className="articleBody-header">
              <h2 className="articleBody-title">{title}</h2>
              <span>Published on {formatDate(publishTime)}</span>
              {tags && (
                <TagList
                  customListCSS="articleBody-wrapperTags"
                  customItemCss="articleBody-tag"
                  tagArrayText={tags}
                />
              )}
            </div>
            <section className="articleBody-section">
              <MarkdownProcessor mdContent={mdContent} />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
