import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
  node: import('hast').Element;
  inline?: boolean;
  className?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  children: any;
};

const CodeBlock = ({
  node,
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || '')!;
  if (!match) return <></>;
  const language = match[1];
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
  );
};

export default CodeBlock;
