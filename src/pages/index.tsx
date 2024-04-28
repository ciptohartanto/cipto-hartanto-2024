import { GetStaticPropsResult } from 'next'
import { useState } from 'react'

import clientQuery from '@/api/clientQuery'
import PageHead from '@/components/PageHead'
import Popup from '@/components/popup'
import { PAGE_TITLE } from '@/constants/project'
import {
  Home as HomePageProps,
  HomeQuery,
  ProjectItem as ProjectItemProps,
  Writing,
  WritingOrderByInput,
} from '@/gql/graphql'
import Layout from '@/layout/Layout'
import QUERY_HOME from '@/queries/queryHome'
import AboutTheWebsite from '@/sections/AboutTheWebsite'
import Hero from '@/sections/Hero'
import Projects from '@/sections/Projects'
import Writings from '@/sections/Writings'
import getExperienceYears from '@/utils/getExperienceYears'

export default function HomePage({
  home,
  writings,
}: {
  home: HomePageProps
  writings: Writing[]
}) {
  const [isPopupActive, setIsPopupActive] = useState(false)
  const [popupData, setPopupData] = useState<null | ProjectItemProps>(null)

  const {
    metaDescription,
    sectionHero: heroContent,
    sectionProject: projectContent,
    sectionWritings: writingsContent,
    sectionAbout: aboutContent,
  } = home

  const textExperienceYears = getExperienceYears()

  return (
    <>
      <PageHead
        pageTitle={PAGE_TITLE.home}
        metaDescription={`${textExperienceYears} ${metaDescription}`}
      />
      <Layout>
        <Hero
          componentData={heroContent}
          textYearsOfExperience={textExperienceYears}
        />
        <Projects
          handleClick={(val) => {
            setIsPopupActive(val)
          }}
          handleUpdatePopupData={(id) => {
            const data = projectContent.listOfProjects[id]
            setPopupData(data)
          }}
          componentData={projectContent}
        />
        <Writings componentData={writingsContent} articleList={writings} />
        <AboutTheWebsite componentData={aboutContent} />
        {popupData && (
          <Popup
            handleClick={(val) => setIsPopupActive(val)}
            shouldDisplayPopup={isPopupActive}
            componentData={popupData}
          />
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomeQuery>
> {
  const data = await clientQuery<HomeQuery>({
    query: QUERY_HOME,
    variableObject: {
      id: process.env.ID_HOME,
      orderBy: WritingOrderByInput.PublishTimeDesc,
    },
  })

  const { home, writings } = data

  return {
    props: { home, writings },
    revalidate: 60,
  }
}
