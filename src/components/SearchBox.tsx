import { useState } from 'react'

import IconX, { IconXTypes } from '@/elements/IconX'

interface SearchBoxProps {
  handleUpdate: (val: string) => void
}

export default function SearchBox({ handleUpdate }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="searchBox">
      <input
        className="searchBox-input"
        placeholder="Search an article"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          handleUpdate(e.target.value)
        }}
      />
      <span
        className="searchBox-icon"
        onClick={() => {
          setInputValue('')
          handleUpdate('')
        }}
      >
        <IconX type={IconXTypes.LIGHT} isActive />
      </span>
    </div>
  )
}
