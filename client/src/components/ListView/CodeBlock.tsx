import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
  language: string | undefined;
  value: any;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <>
      <p className="header-code">{language}</p>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        wrapLongLines={false}
      >
        {value}
      </SyntaxHighlighter>
    </>
  );
};

export default CodeBlock;
