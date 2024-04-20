import { GetStaticPropsResult } from 'next'

import clientQuery from '@/api/clientQuery'
import PageHead from '@/components/PageHead'
import { PAGE_TITLE } from '@/constants/project'
import { Resume as ResumePageProps, ResumeQuery } from '@/gql/graphql'
import Layout from '@/layout/Layout'
import QUERY_RESUME from '@/queries/queryResume'
import ResumeBody from '@/sections/ResumeBody'

export default function ResumePage({ resume }: { resume: ResumePageProps }) {
  const { sectionResume: resumeBodyData } = resume

  return (
    <>
      <PageHead
        pageTitle={PAGE_TITLE.resume}
        metaDescription={resumeBodyData.metaDescription}
      />
      <Layout>
        <ResumeBody componentData={resumeBodyData} />
      </Layout>
    </>
  )
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<ResumeQuery>
> {
  const data = await clientQuery<ResumeQuery>({
    query: QUERY_RESUME,
    variableObject: { id: process.env.ID_RESUME },
  })

  const { resume } = data
  return {
    props: { resume },
    revalidate: 10,
  }
}
