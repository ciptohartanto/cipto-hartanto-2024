import { GetStaticPathsResult, GetStaticPropsResult } from 'next'
import { useMemo } from 'react'

import clientQuery from '@/api/clientQuery'
import PageHead from '@/components/PageHead'
import {
  Writing as WritingArticleBodyProp,
  WritingArticleItemQuery,
  WritingOrderByInput,
  WritingsQuery,
} from '@/gql/graphql'
import Layout from '@/layout/Layout'
import QUERY_WRITING_ITEM from '@/queries/queryWritingItem'
import QUERY_WRITINGS from '@/queries/queryWritings'
import ArticleBody, { ArticleNavProps } from '@/sections/ArticleBody'

type ArticleItemParams = {
  params: {
    slug: string
  }
  fallback: boolean
}

export default function WritingsPage({
  writing: articleBodyData,
  writings,
}: {
  writing: WritingArticleBodyProp
  writings: WritingArticleBodyProp[]
}) {
  const memoArticleNav = useMemo(() => {
    const arrLength = writings.length
    const theSiblings: ArticleNavProps[] = []
    writings.map((item, idx) => {
      if (item.slug === articleBodyData.slug) {
        theSiblings.push({
          nextArticle:
            idx + 1 < arrLength
              ? {
                  slug: writings[idx + 1].slug,
                  title: writings[idx + 1].title,
                }
              : null,
          prevArticle:
            idx - 1 >= 0
              ? {
                  slug: writings[idx - 1].slug,
                  title: writings[idx - 1].title,
                }
              : null,
        })
      }
    })
    return theSiblings
  }, [writings, articleBodyData])

  return (
    <>
      <PageHead
        pageTitle={articleBodyData.title}
        metaDescription={articleBodyData.metaDescription}
      />
      <Layout>
        <ArticleBody
          componentData={articleBodyData}
          articleNav={memoArticleNav[0]}
        />
      </Layout>
    </>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const data = await clientQuery<WritingsQuery>({
    query: QUERY_WRITINGS,
    variableObject: { orderBy: WritingOrderByInput.PublishTimeDesc },
  })

  const { writings } = data
  const paths = writings.map((item) => ({
    params: { slug: item.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(
  context: ArticleItemParams
): Promise<GetStaticPropsResult<WritingArticleItemQuery>> {
  const { slug } = context.params

  const data = await clientQuery<WritingArticleItemQuery>({
    query: QUERY_WRITING_ITEM,
    variableObject: { slug, orderBy: WritingOrderByInput.PublishTimeDesc },
  })

  const { writing, writings } = data
  return {
    props: { writing, writings },
    revalidate: 10,
  }
}
