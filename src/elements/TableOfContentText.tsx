import classNames from 'classnames'

interface TableOfContentTextProps {
  text: string
  isActive: boolean
}

export default function TableOfContentText({
  text,
  isActive,
}: TableOfContentTextProps) {
  return (
    <div
      className={classNames('tableOfContentText', {
        'tableOfContentText--active': isActive,
      })}
    >
      <span className="tableOfContentText-text">{text}</span>
    </div>
  )
}
