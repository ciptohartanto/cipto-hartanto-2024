import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { CODE_SNIPPET_TEXT } from '@/constants/project'

type CodeSnippetProps = {
  content: string
  lang: string | undefined
}

const customStyle = {
  lineHeight: '1.2',
  borderRadius: '10px',
  padding: '10px 60px 10px 10px',
}

export default function CodeSnippet({ content, lang }: CodeSnippetProps) {
  const [isCopied, setIsCopied] = useState(false)
  return (
    <>
      {!lang ? (
        <code className="codeSnippet--inline">{content}</code>
      ) : (
        <div className="codeSnippet">
          <CopyToClipboard
            text={content}
            onCopy={() => {
              setIsCopied(true)
              setTimeout(() => {
                setIsCopied(false)
              }, 1000)
            }}
          >
            <button className="codeSnippet-button">
              {isCopied ? CODE_SNIPPET_TEXT.copied : CODE_SNIPPET_TEXT.copy}
            </button>
          </CopyToClipboard>
          <SyntaxHighlighter
            language={lang}
            style={nightOwl}
            customStyle={customStyle}
            showLineNumbers
          >
            {content}
          </SyntaxHighlighter>
        </div>
      )}
    </>
  )
}
