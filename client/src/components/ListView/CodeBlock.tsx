import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CustomRender from './CustomRender/CustomRender';
import checkCustomType from './CustomRender/customhelper';

type CodeBlockProps = {
  language: string | undefined;
  value: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  // This is currently a hack to also use codeblock for custom elements
  // I'd love to use shortcodes, but they dont seem to work here
  if (checkCustomType(language)) {
    return <CustomRender identifier={language} text={value} />;
  }
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
