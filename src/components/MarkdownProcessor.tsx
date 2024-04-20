import Markdown from 'react-markdown'

import { HEADING3_CSS } from '@/constants/project'

import CodeSnippet from './CodeSnippet'

type MarkDownProcessorProps = {
  mdContent: string
}

export default function MarkdownProcessor({
  mdContent,
}: MarkDownProcessorProps) {
  return (
    <Markdown
      components={{
        h3(props) {
          const { children } = props
          return <h3 className={HEADING3_CSS}>{children}</h3>
        },
        code(props) {
          const { children, className, ...rest } = props
          const lang = className?.split('language-')[1]
          return (
            <CodeSnippet content={String(children)} lang={lang} {...rest} />
          )
        },
      }}
    >
      {mdContent}
    </Markdown>
  )
}
