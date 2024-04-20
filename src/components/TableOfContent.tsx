import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import { HEADING3_CSS, TOC_ROOT_MARGIN } from '@/constants/project'
import TableOfContentText from '@/elements/TableOfContentText'

type Heading3DataProps = {
  title: string
  id: string
}

export default function TableOfContent() {
  const [heading3Data, setHeading3Data] = useState<[] | Heading3DataProps[]>()
  const [activeId, setActiveId] = useState<undefined | string>(undefined)

  const router = useRouter()

  const memoAllHeadings = useMemo(() => {
    return (
      <>
        {heading3Data && (
          <ol className="tableOfContent">
            {heading3Data.map((item, idx) => (
              <li key={item.id} className="tableOfContent-item">
                <a href={`#${item.id}`}>
                  <TableOfContentText
                    text={item.title}
                    isActive={activeId ? item.id === activeId : idx === 0}
                  />
                </a>
              </li>
            ))}
          </ol>
        )}
      </>
    )
  }, [heading3Data, activeId])

  useEffect(() => {
    if (document) {
      const heading3s = document.querySelectorAll(`.${HEADING3_CSS}`)

      const idTextWithoutSpace = (idText: any) => {
        const text = idText.textContent ?? ''
        const idWithoutWhiteSpace = text.replace(/ /g, '')
        return idWithoutWhiteSpace
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idWithoutWhiteSpace = idTextWithoutSpace(entry.target)

              setActiveId(idWithoutWhiteSpace)
            }
          })
        },
        { threshold: 0.5, rootMargin: TOC_ROOT_MARGIN }
      )

      const newArr: Heading3DataProps[] = []

      heading3s.forEach((h3) => {
        // loop heading3s and add id based on its text

        const idWithoutWhiteSpace = idTextWithoutSpace(h3)
        h3.setAttribute('id', idWithoutWhiteSpace)

        // update newArr which holds all heading3 data
        newArr.push({
          title: h3.textContent ?? '',
          id: h3.getAttribute('id') ?? '',
        })

        // add observer to each h3
        observer.observe(h3)
      })

      // update heading3 data in heading3Data
      setHeading3Data(newArr)
    }
  }, [router])

  return <div className="tableOfContent">{memoAllHeadings}</div>
}
