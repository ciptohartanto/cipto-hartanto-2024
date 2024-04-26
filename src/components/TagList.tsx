import Tag from '@/elements/Tag'

type TagListProps = {
  customListCSS: string
  customItemCss: string
  tagArrayText: string
}

export default function TagList({
  customItemCss,
  customListCSS,
  tagArrayText,
}: TagListProps) {
  return (
    <ul className={customListCSS}>
      {tagArrayText.split(',').map((item) => (
        <li key={item} className={customItemCss}>
          <Tag text={item} />
        </li>
      ))}
    </ul>
  )
}
