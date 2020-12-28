import React from 'react';
import ReactMarkdown from 'react-markdown';
import Tex from '@matejmazur/react-katex';
import math from 'remark-math';
import 'katex/dist/katex.min.css';
import CodeBlock from './CodeBlock';
import HeadingRenderer from './HeadingRenderer';

const MarkdownBlock = ({ maxWidth, sourcedata }) => {
  const PictureRenderer = ({ alt, src, title }) => (
    <img
      alt={alt}
      src={src}
      title={title}
      style={{
        maxWidth,
        borderRadius: '10px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    />
  );
  return (
    <ReactMarkdown
      className="blog-md"
      plugins={[math]}
      escapeHtml={false}
      source={sourcedata}
      renderers={{
        code: CodeBlock,
        heading: HeadingRenderer,
        image: PictureRenderer,
        inlineMath: ({ value }) => <Tex math={value} />,
        math: ({ value }) => <Tex block math={value} />,
      }}
    />
  );
};

export default MarkdownBlock;
