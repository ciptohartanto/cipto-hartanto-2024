import Tag from '@/elements/Tag'
import textToArray from '@/utils/textToArray'

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
      {textToArray(tagArrayText).map((item) => (
        <li key={item} className={customItemCss}>
          <Tag text={item} />
        </li>
      ))}
    </ul>
  )
}
