import classNames from 'classnames'
import { ReactNode } from 'react'

interface SubSectionProps {
  title: string
  cssClassName?: string
  children: ReactNode
}

export default function SubSection({
  title,
  cssClassName,
  children,
}: SubSectionProps) {
  return (
    <div className={classNames('subSection', cssClassName)}>
      <h3 className="subSection-title">{title}</h3>
      <div className="subSection-row">{children}</div>
    </div>
  )
}
