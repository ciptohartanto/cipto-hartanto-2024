import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import clientQuery from '@/api/clientQuery'
import { HomeQuery, WritingOrderByInput } from '@/gql/graphql'
import QUERY_HOME from '@/queries/queryHome'

const URL = 'https://ciptohartanto.com'

type SiteMapProps = Pick<HomeQuery, 'writings'>

function generateSiteMap({ writings }: SiteMapProps) {
  const theDate = new Date()
  const stringDate = theDate.toISOString()
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${URL}</loc>
       <lastmod>${stringDate}</lastmod>
     </url>
     <url>
       <loc>${URL}/resume</loc>
       <lastmod>${stringDate}</lastmod>
     </url>
     ${writings
       .map(({ slug, updatedAt }) => {
         return `
       <url>
           <loc>${URL}/writings/${slug}</loc>
           <lastmod>${updatedAt}</lastmod>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({
  res,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<SiteMapProps>> {
  const data = await clientQuery<SiteMapProps>({
    query: QUERY_HOME,
    variableObject: {
      id: process.env.ID_HOME,
      orderBy: WritingOrderByInput.PublishTimeDesc,
    },
  })

  const { writings } = data

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap({ writings })

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: { writings },
  }
}

export default SiteMap
