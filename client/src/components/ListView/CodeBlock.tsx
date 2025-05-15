import React from 'react'
import { Prism, SyntaxHighlighterProps } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeBlockProps = {
  node?: import('hast').Element
  inline?: boolean
  className?: string
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  children?: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SyntaxHighlighter = Prism as any as React.FC<SyntaxHighlighterProps>

const CodeBlock = ({
  node,
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className ?? '')!
  if (!match) return <code>{children}</code>
  const language = match[1]
  return (
    <>
      <p className="header-code">{language}</p>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        wrapLongLines={false}
        {...props}
      >
        {children}
      </SyntaxHighlighter>
    </>
  )
}

export default CodeBlock
