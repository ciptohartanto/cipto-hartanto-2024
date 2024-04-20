import { TRADEMARK_TEXT } from '@/constants/project'

export default function Trademark() {
  return (
    <div className="trademark">
      <span className="trademark-line1">{TRADEMARK_TEXT.firstLine}</span>
      <span className="trademark-line2">{TRADEMARK_TEXT.secondLine}</span>
    </div>
  )
}
