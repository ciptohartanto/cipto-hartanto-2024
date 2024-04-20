interface TagProps {
  text: string
}

export default function Tag({ text }: TagProps) {
  return (
    <div className="tag">
      <span className="tag-text">{text}</span>
    </div>
  )
}
