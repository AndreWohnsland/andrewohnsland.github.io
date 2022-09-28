import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
  node: import('hast').Element;
  inline?: boolean | undefined;
  className?: string | undefined;
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
  // This is currently a hack to also use codeblock for custom elements
  // I'd love to use shortcodes, but they dont seem to work here
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
